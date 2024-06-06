
const config = require('config');
const { handleError } = require('../utils/handleErrors');
const { verifyAuthToken } = require('./Providers/jwt');

const tokenGenerater = config.get("TOKEN_GENERATOR") || "jwt";
const auth = (req, res, next) => {
    if (tokenGenerater === "jwt") {
        try {
            const tokenFromClient = req.header('x-auth-token');
            if (!tokenFromClient) return handleError(res, 401, "access denied. No Token Provided");

            // not just verify the token, if everything is good returns the user email and password
            const userData = verifyAuthToken(tokenFromClient);
            if (!userData) return handleError(res, 400, "Invalid Token");


            req.user = userData;
            return next();
        } catch (error) {
            return handleError(res, 401, error.message);
        }
    }
    return handleError(res, 500, "you don't use jwt");
}

exports.auth = auth;