const mongoose = require("mongoose");
const { URL, DEFAULT_VALIDATION } = require("../../helper/mongooseValidator");

const Image = new mongoose.Schema({
    url: URL,
    alt: DEFAULT_VALIDATION,
});

module.exports = Image;
