let { upload, deleteImg } = require("../config/imgUpload");

escapeRegex = text => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports.products = async (req, res) => {
    let { search, perPage, pageNo, sortBy, sortType, id } = req.query;
    let products;
    if (id) {
        products = await Product.findById(id);
        return res
            .status(200)
            .json({ message: "success", error: false, data: products });
    } else {
        perPage = perPage || 10;
        pageNo = pageNo || 1;
        sortBy = sortBy || "createdAt";
        sortType = sortType || "desc";
        let filter = {};
        if (search) {
            const regex = new RegExp(escapeRegex(search), "gi");
            filter.$or = [{ title: regex }, { description: regex }];
        }
        products = await Product.find(filter)
            .sort({ "[sortBy]": sortType })
            .limit(perPage * pageNo)
            .skip(perPage * pageNo - perPage);
        let totalProductsSearched = await Product.countDocuments(filter);
        let totalPagesRequired = Math.floor(
            Number(totalProductsSearched / perPage) + 1
        );
        let data = {
            products,
            totalPagesRequired,
            totalProductsSearched
        };
        res.status(200).json({ message: "success", error: false, data });
    }
};

module.exports.addProduct = async (req, res) => {
    let { title, description, price } = req.body;
    let product = await Product.findOne({
        title: { $regex: `^${title}$`, $options: "i" }
    });
    if (product) {
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
        let newProduct = { ...req.body, image };
        product = await Product.create(req.body);
        res.status(200).json({
            message: "success",
            error: false,
            data: product
        });
    }
};

module.exports.updateProduct = async (req, res) => {
    let { id } = req.params;
    let { title, description, price } = req.body;
    let product = await Product.findById(id);
    if (product) {
        if (req.file) {
            await deletePreviousImage(product.image.id);
            product.image.url = req.file.secure_url;
            product.image.id = req.file.public_id;
        }
        product.title = title;
        product.description = description;
        product.price = price;
        product = await product.save();
        res.status(200).json({
            message: "success",
            error: false,
            data: product
        });
    } else {
        res.status(400).json({
            message: "Product not Found",
            error: true,
            data: null
        });
    }
};

module.exports.deleteProduct = async (req, res) => {
    let { id } = req.params;
    let product = await Product.findById(id);
    if (product) {
        await product.delete();
        res.status(200).json({
            message: "success",
            error: false,
            data: null
        });
    } else {
        res.status(400).json({
            message: "Product not Found",
            error: true,
            data: null
        });
    }
};
