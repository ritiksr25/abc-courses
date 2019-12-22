module.exports.users = async (req, res) => {
    let users = await User.find({ isAdmin: false }).sort({ createdAt: "desc" });
    res.status(200).json({ message: "success", error: false, data: users });
};
