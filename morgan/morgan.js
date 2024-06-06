// create small express app
const express = require('express');
const app = express();
const cors = require('cors');
const chalk = require('chalk');
const morgan = require('morgan');

// app.use(morgan(
//     chalk.cyanBright('[:date[clf]] :method :url :status :response-time ms')
// ));
app.use(morgan((tokens, req, res) => {
    return [
        chalk.cyanBright(tokens.date(req, res, 'clf')),
        chalk.yellow(tokens.method(req, res)),
        chalk.green(tokens.url(req, res)),
        chalk.red(tokens.status(req, res)),
        chalk.blue(tokens['response-time'](req, res) + ' ms')
    ].join(' ');
}));


app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send({ message: 'Hello World' });
});

// error handler
app.use((err, req, res, next) => {
    console.log(chalk.red('Error Handler'), err);
    res.status(500).json({ error: 'returning 500 from global middleware' });
});

app.listen(3001, () => {
    console.log('listening on port 3001');
});

