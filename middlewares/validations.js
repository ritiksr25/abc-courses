let emailRegex = /^\S+@\S+\.\S+/,
    passwordRegex = /^[\S]{8,}/;

module.exports.userValidation = (req, res, next) => {
    let { name, email, password } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json({
            message: "All fields are mandatory",
            error: true,
            data: req.body
        });
    }
    if (emailRegex.test(String(email))) {
        if (passwordRegex.test(String(password))) {
            return next();
        } else {
            res.status(400).json({
                message: "Password must be atleast 8 characters long",
                error: true,
                data: req.body
            });
        }
    } else {
        res.status(400).json({
            message: "EmailID is not valid",
            error: true,
            data: req.body
        });
    }
};

module.exports.productValidation = (req, res, next) => {
    let { title, description, price } = req.body;
    if (!title || !description || !price) {
        return res
            .status(400)
            .json({
                message: "All fields are mandatory",
                error: true,
                data: req.body
            });
    } else if (Number(price) < 1) {
        return res
            .status(400)
            .json({
                message: "Price cannot be less than 1",
                error: true,
                data: req.body
            });
    } else {
        return next();
    }
};
