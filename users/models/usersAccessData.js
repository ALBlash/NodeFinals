const DB = process.env.DB || "MONGODB";
const { generateAuthToken } = require("../../auth/Providers/jwt");
const { handleBadRequest } = require("../../utils/handleErrors");
const { comparePassword } = require("../helpers/bcrypt");
const User = require("./mongodb/User");
const lodash = require("lodash");

const register = async normalizedUser => {
    if (DB === "MONGODB") {
        try {
            const { email } = normalizedUser;
            let user = await User.findOne({ email });
            if (user) throw new Error("User already registered");
            user = new User(normalizedUser);
            user = await user.save();
            user = lodash.pick(user, ["name", "email", "_id"]);
            return Promise.resolve(user);
        } catch (error) {
            error.status = 400;
            return Promise.reject(error);
        }
    }
    return Promise.resolve("registerUser new user not in mongodb");
};

const login = async ({ email, password }) => {
    if (DB === "MONGODB") {
        try {
            const user = await User.findOne({ email });
            if (!user) throw new Error("Invalid email or password");
            const validPassword = comparePassword(password, user.password);
            if (!validPassword) throw new Error("Invalid email or password");
            const token = generateAuthToken(user);
            return Promise.resolve(token);
        } catch (error) {
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("User creation not supported in MongoDB");
};


const find = async () => {
    if (DB === "MONGODB") {
        try {
            const users = await User.find({}, { password: 0, __v: 0 });
            return Promise.resolve(users);
        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }
    return Promise.resolve("get users not in mongodb");
};

const findOne = async userId => {
    if (DB === "MONGODB") {
        try {
            //   throw new Error("Opss... i did it again!");
            return Promise.resolve(`get user no: ${userId}`);
        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }
    return Promise.resolve("get user not in mongodb");
};

const update = async (userId, normalizedUser) => {
    if (DB === "MONGODB") {
        try {
            return Promise.resolve({ normalizedUser, userId });
        } catch (error) {
            error.status = 400;
            return Promise.reject(error);
        }
    }
    return Promise.resolve("card update not in mongodb");
};

const changeIsBizStatus = async (userId, isBusiness) => {
    if (DB === "MONGODB") {
        try {
            const newStatus = !isBusiness;
            const user = await User.findByIdAndUpdate(userId, { isBusiness: newStatus }, { new: true });
            return Promise.resolve(`user no. ${userId} change his business status!`);
        } catch (error) {
            error.status = 400;
            return Promise.reject(error);
        }
    }
    return Promise.resolve("card liked not in mongodb");
};

const remove = async userId => {
    if (DB === "MONGODB") {
        try {
            return Promise.resolve(`user no. ${userId} deleted!`);
        } catch (error) {
            error.status = 400;
            return Promise.reject(error);
        }
    }
    return Promise.resolve("card deleted not in mongodb");
};

exports.register = register;
exports.login = login;
exports.find = find;
exports.findOne = findOne;
exports.update = update;
exports.changeIsBizStatus = changeIsBizStatus;
exports.remove = remove;
