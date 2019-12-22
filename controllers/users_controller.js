const bcrypt = require("bcryptjs");

module.exports.register = async (req, res) => {
    let { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
        res.status(400).json({
            message: "Already exists.",
            error: true,
            data: null
        });
    } else {
        let salt = await bcrypt.genSalt();
        password = await bcrypt.hash(password, salt);
        let newUser = {
            name,
            email,
            password
        };
        await User.create(newUser);
        res.status(200).json({ message: "success", error: false, data: null });
    }
};

module.exports.login = async (req, res) => {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (email) {
        let isMatchPassword = await bcrypt.compare(password, user.password);
        if (isMatchPassword) {
            let token = user.generateAuthToken();
            res.status(200)
                .header("x-auth-token", token)
                .json({ message: "success", error: false, data: user });
        } else {
            res.status(400).json({
                message: "Invalid Credentials",
                error: true,
                data: req.body
            });
        }
    } else {
        res.status(200).json({
            message: "Invalid User",
            error: true,
            data: null
        });
    }
};
