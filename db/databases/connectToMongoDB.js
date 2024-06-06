const mongoose = require('mongoose');
const chalk = require('chalk');


async function connect() {
    // we run the connect method that comes with the obj "mongoose";
    return mongoose
        .connect('mongodb://127.0.0.1:27017/business-card-app')
        .then(() => {
            console.log(chalk.green('Connected to MongoDB'));
        })
        .catch((err) => {
            console.log(chalk.redBright('Error connecting to MongoDB'));
            console.log(chalk.red(err));
        });
}
module.exports = connect;
