let { upload, deleteImg } = require("../config/imgUpload");

escapeRegex = text => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports.courses = async (req, res) => {
    let { search, category, perPage, pageNo, sortBy, sortType, id } = req.query;
    let courses;
    
        perPage = perPage || 10;
        pageNo = pageNo || 1;
        sortBy = sortBy || "createdAt";
        sortType = sortType || "desc";
        let filter = {};
        if (search) {
            const regex = new RegExp(escapeRegex(search), "gi");
            filter.$or = [
                { title: regex },
                { description: regex },
                { category: regex }
            ];
        }
        if (category) filter.category = category;
        courses = await Course.find(filter)
            .sort({ "[sortBy]": sortType })
            .limit(perPage * pageNo)
            .skip(perPage * pageNo - perPage);
        let totalcoursesSearched = await Course.countDocuments(filter);
        let totalPagesRequired = Math.floor(
            Number(totalcoursesSearched / perPage) + 1
        );
        let data = {
            courses,
            totalPagesRequired,
            totalcoursesSearched
        };
        res.status(200).json({ message: "success", error: false, data });
};

module.exports.course = async (req, res) => {
    let { id } = req.params;
    let courses = await Course.findById(id);
        let isBuyable = false;
        if (req.user) {
            let ordered = await Order.findOne({
                $and: [{ course: id }, { user: req.user.id }]
            });
            if (!ordered) {
                isBuyable = true;
            }
        }
        let data = {
            courses,
            isBuyable
        };
        return res.status(200).json({ message: "success", error: false, data });
}

module.exports.addCourse = async (req, res) => {
    let { title, description, price, category } = req.body;
    let course = await Course.findOne({
        $and: [
            {
                title: { $regex: `^${title}$`, $options: "i" }
            },
            { category }
        ]
    });
    if (course) {
        res.status(400).json({
            message: "Already Exists.",
            error: true,
            data: req.body
        });
    } else {
        let image = {
            url: undefined,
            id: undefined
        };
        if (req.file) {
            image.url = req.file.secure_url;
            image.id = req.file.public_id;
        }
        let newCourse = { ...req.body, image };
        course = await Course.create(req.body);
        res.status(200).json({
            message: "success",
            error: false,
            data: course
        });
    }
};

module.exports.updateCourse = async (req, res) => {
    let { id } = req.params;
    let { title, description, price, category } = req.body;
    let course = await Course.findById(id);
    if (course) {
        if (req.file) {
            await deletePreviousImage(course.image.id);
            course.image.url = req.file.secure_url;
            course.image.id = req.file.public_id;
        }
        course.title = title;
        course.description = description;
        course.price = price;
        course.category = category;
        course = await course.save();
        res.status(200).json({
            message: "success",
            error: false,
            data: course
        });
    } else {
        res.status(400).json({
            message: "Course not Found",
            error: true,
            data: null
        });
    }
};

module.exports.deleteCourse = async (req, res) => {
    let { id } = req.params;
    let course = await Course.findById(id);
    if (course) {
        await course.delete();
        res.status(200).json({
            message: "success",
            error: false,
            data: null
        });
    } else {
        res.status(400).json({
            message: "Course not Found",
            error: true,
            data: null
        });
    }
};
