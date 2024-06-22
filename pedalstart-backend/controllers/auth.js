const bcrypt = require("bcryptjs");

const User = require("../models/user");

const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const userPresent = User.findOne({ email: email });
        if (userPresent) {
            const error = new Error("User already exists");
            error.statusCode = 403;
            throw error;
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            email: email,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json({ message: "User created" });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 401;
            throw error;
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error("Wrong password");
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign(
            {
                email: user.email,
                userId: user._id.toString(),
            },
            JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.status(200).json({ token: token, userId: user._id.toString() });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
