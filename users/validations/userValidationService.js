// this page is all about if the user information is valid

const registerValidation = require("./Joi/registerValidation");
const loginValidation = require("./Joi/loginValidation");
const updateValidation = require("./Joi/userUpdateValidation");

const validator = undefined || "Joi";

const validateRegistration = user => {
    if (validator === "Joi") return registerValidation(user);
};

const validateLogin = user => {
    if (validator === "Joi") return loginValidation(user);
};

const validateUpdate = user => {
    if (validator === "Joi") return updateValidation(user);
}

exports.validateRegistration = validateRegistration;
exports.validateLogin = validateLogin;
exports.validateUpdate = validateUpdate;
