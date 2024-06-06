const chalk = require('chalk');
const { create } = require('../cards/models/cardsDataAccessService');
const dataUsers = require('./initialDataUsers.json');
const dataCards = require('./initialData.json');
const { register } = require('../users/models/usersAccessData');
const normalizeUser = require('../users/helpers/normalizeUser');
const { registerUser } = require('../users/service/userService');
const { generateUserPassword } = require('../users/helpers/bcrypt');
const User = require('../users/models/mongodb/User');
const Card = require('../cards/models/mongodb/card');

const generateInitialDataCards = async () => {
    const { cards } = dataCards;

    const count = await Card.countDocuments();
    if (count > 0) return;

    cards.forEach(async card => {
        try {
            await create(card)
        } catch (error) {
            console.log(chalk.red(error));
        }
    });

}

// const generateInitialDataUsers = async () => {
//     const any = await User.countDocuments() > 0;
//     if (any) return;

//     const { users } = data;
//     users.forEach(async user => {
//         try {
//             user = await normalizeUser(user);

//             user.password = generateUserPassword(user.password);
//             await registerUser(user);
//         } catch (error) {
//             console.log(chalk.red(error));
//         }
//     });
// }


const generateInitialDataUsers = async () => {
    try {
        const count = await User.countDocuments();
        if (count > 0) return; // If there are already documents, no need to generate initial data

        const { users } = dataUsers;
        for (const user of users) {
            try {
                const normalizedUser = await normalizeUser(user);
                normalizedUser.password = generateUserPassword(normalizedUser.password);
                await registerUser(normalizedUser);
            } catch (error) {
                console.log(chalk.red(error));
            }
        }
    } catch (error) {
        console.log(chalk.red(error));
    }
}


exports.generateInitialDataCards = generateInitialDataCards;
exports.generateInitialDataUsers = generateInitialDataUsers;
