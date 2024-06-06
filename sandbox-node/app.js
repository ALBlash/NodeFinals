const express = require('express');
const app = express();
const chalk = require('chalk');
const User = require('../users/models/mongodb/User');


app.get('/user', (req, res, next) => {
    res.send({ name: 'user', age: 50 });
});

app.post('/', (req, res, next) => {
    res.send([{ name: user, age: 55 }, { name: second, age: 3 }]);
});

app.delete('/1', (req, res, next) => {
    res.send('User deleted');
});

app.put('/2', (req, res, next) => {
    res.send('User was updated');
});

app.patch('/3', (req, res, next) => {
    res.send('User like post');
});
