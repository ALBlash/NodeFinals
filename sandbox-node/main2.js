const { first } = require('./module.exports');
const { last } = require('./module.exports2');
const chalk = require('chalk');
const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("in Ari's application")
})

const PORT = 8181;
app.listen(PORT, () => {
    console.log(chalk.greenBright(`http://localhost:${PORT}`));
})

// console.log(chalk.blue('Hello world!!'));
// console.log(first.name);
// console.log(second[2]);
console.log(first.name, last);