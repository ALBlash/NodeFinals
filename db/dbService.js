const config = require("config");
const ENVIRONMENT = config.get("NODE_ENV");

async function connectToDb() {
    if (!ENVIRONMENT || ENVIRONMENT === "development") {
        const connect = require("../db/databases/connectToMongoDB");
        const v = await connect()
        return v;
    }

    if (ENVIRONMENT === "production") {
        const connect = require("../db/databases/connectToAtlas");
        const v = await connect()
        return v;
    }
};

module.exports = connectToDb;
