const User = require("../models/user");

exports.isUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 401;
            throw error;
        }
        if (user.role === "user") {
            next();
        } else {
            const error = new Error("Permission denied for user");
            error.statusCode = 403;
            throw error;
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
