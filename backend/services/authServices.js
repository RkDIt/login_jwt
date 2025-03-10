const User = require("../models/User");
const { hashedPassword, comparePassword } = require("../utils/passwordHasher");
const generateToken = require("../utils/jwtTokenGen");
const messages = require("../utils/responseMsg");

const registerUser = async ({ name, email, password, role }) => {
    if (!name || !email || !password) {
        throw { status: 400, message: messages.REQUIRED_FIELDS };
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        throw { status: 400, message: messages.USER_EXISTS };
    }

    const hashPassword = await hashedPassword(password);
    const user = await User.create({
        name,
        email,
        password: hashPassword,
        role
    });

    if (!user) {
        throw { status: 400, message: messages.INVALID_DATA };
    }

    return {
        _id: user.id,
        name: user.name,
        email: user.email
    };
};

const loginUser = async ({ email, password }) => {
    if (!email || !password) {
        throw { status: 401, message: messages.REQUIRED_FIELDS };
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw { status: 401, message: messages.INVALID_CREDENTIALS };
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw { status: 401, message: messages.PASS_NOMATCH };
    }

    return {
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role)
    };
};

module.exports = { registerUser, loginUser };
