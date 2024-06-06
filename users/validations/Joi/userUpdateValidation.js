const Joi = require("joi");

const userUpdateValidation = user => {
    const schema = Joi.object({
        name: Joi.object()
            .keys({
                first: Joi.string().min(2).max(256),
                middle: Joi.string().min(2).max(256).allow(""),
                last: Joi.string().min(2).max(256),
            })
            .min(1) // At least one name part should be provided if updating
            .required(),

        isBusiness: Joi.boolean(),

        phone: Joi.string()
            .pattern(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
            .message('User "phone" must be a valid phone number'),

        email: Joi.string()
            .pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
            .message('User "email" must be a valid email'),

        password: Joi.string()
            .pattern(/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/)
            .message('User "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number, and one of the following characters !@#$%^&*-'),

        image: Joi.object().keys({
            url: Joi.string()
                .pattern(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)
                .message("User image must be a valid URL"),
            alt: Joi.string().min(2).max(256),
        }),

        address: Joi.object().keys({
            state: Joi.string().allow(""),
            country: Joi.string(),
            city: Joi.string(),
            street: Joi.string(),
            houseNumber: Joi.number(),
            zip: Joi.number().allow(null), // Allowing null for optional zip code
        }),

        isAdmin: Joi.boolean(),
    }).min(1); // At least one field should be provided for update

    return schema.validate(user);
};

module.exports = userUpdateValidation;
