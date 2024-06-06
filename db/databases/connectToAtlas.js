const mongoose = require('mongoose');
const chalk = require('chalk');
const config = require('config');

const userName = config.get('DB_NAME')
const password = config.get('DB_PASSWORD')
async function connect() {
    return mongoose
        .connect(`mongodb+srv://${userName}:${password}@hackeru.lkgxaar.mongodb.net/`)
        // .connect(`mongodb+srv://alblashnikov:Albm1242@hackeru.lkgxaar.mongodb.net/`)
        .then(() => {
            console.log(chalk.magentaBright('Connected to Atlas MongoDB'));
        })
        .catch((err) => {
            console.log(chalk.redBright('Error connecting to Atlas MongoDB'));
            console.log(chalk.red(err));
        });
}

module.exports = connect;