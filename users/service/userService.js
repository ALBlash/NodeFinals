const { handleJoiError } = require("../../utils/handleErrors");
const {
    register,
    login,
    find,
    findOne,
    update,
    changeIsBizStatus,
    remove,
} = require("../models/usersAccessData");
const {
    validateRegistration,
    validateLogin,
} = require("../validations/userValidationService");

const registerUser = async rawUser => {
    const { error } = validateRegistration(rawUser);
    if (error) return handleJoiError(error);

    try {
        let user = { ...rawUser };
        user.createdAt = new Date();
        user = await register(user);
        return Promise.resolve(user);
    } catch (error) {
        return Promise.reject(error);
    }
};

const loginUser = async user => {
    const { error } = validateLogin(user);
    if (error) return handleJoiError(error);

    try {
        // after all it returns Promise.rersolve token
        user = await login(user);
        return Promise.resolve(user);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getUsers = async () => {
    try {
        const users = await find();
        return Promise.resolve(users);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getUser = async userId => {
    try {
        const user = await findOne(userId);
        return Promise.resolve(user);
    } catch (error) {
        return Promise.reject(error);
    }
};

const updateUser = async (userId, rawUser) => {
    try {
        let user = { ...rawUser };
        user = await update(userId, user);
        return Promise.resolve(user);
    } catch (error) {
        return Promise.reject(error);
    }
};

const changeUserBusinessStatus = async (userId, isBusiness) => {
    try {
        const user = await changeIsBizStatus(userId, isBusiness);
        return Promise.resolve(user);
    } catch (error) {
        return Promise.reject(error);
    }
};

const deleteUser = async userId => {
    try {
        const user = await remove(userId);
        return Promise.resolve(user);
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.changeUserBusinessStatus = changeUserBusinessStatus;
exports.deleteUser = deleteUser;
