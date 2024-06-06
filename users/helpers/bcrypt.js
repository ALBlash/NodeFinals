const bcrypt = require('bcryptjs');

// before the "hashing" process starts
// we add salt to the password
// for the encryption to be stronger
const generateUserPassword = passsword => {
    return bcrypt.hashSync(passsword, 10);
}

const comparePassword = (password, anotherPassword) => { // anotherPassword is the one stored in the database (the hash)
    return bcrypt.compareSync(password, anotherPassword);
}

exports.generateUserPassword = generateUserPassword;
exports.comparePassword = comparePassword;