const jwt = require('jsonwebtoken');
const config = require('config');


const key = config.get('JWT_KEY');
const generateAuthToken = user => {
    const { _id, isAdmin, isBusiness } = user;
    const token = jwt.sign({ _id, isAdmin, isBusiness }, key);
    console.log(token);
    return token;
}


const verifyAuthToken = token => {
    try {
        // dosen't just verify but also returns with the user's email and password
        const userData = jwt.verify(token, key);
        return userData;
    } catch (error) {
        // we perefer to have a null as the info that sets as the users token
        // insted of it being an error
        return null;
    }
}

exports.generateAuthToken = generateAuthToken;
exports.verifyAuthToken = verifyAuthToken;