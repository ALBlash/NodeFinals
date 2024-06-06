// express
const express = require('express');
const app = express();
const chalk = require('chalk');
const mongoose = require('mongoose');
const { date, array, required, bool } = require('joi');
const { trim, lowerCase, min } = require('lodash');

// this is the schema creation part.
const nameSchema = new mongoose.Schema({
    first: {
        type: String,
        trim: true,
    },
    last: {
        type: String,
        trim: true,
    }
});

const schema = new mongoose.Schema({
    string: String,
    number: Number,
    bool: Boolean,
    date: { type: Date, default: Date.now },
});
const Test = mongoose.model('test', schema); // this is the model creation part.

app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const cards = await Test.find();
        // the reason there's no "save()" here is because
        //that we are looking for data that will match the schema (Test), and thats all
        res.send({ cards });
    } catch (error) {
        console.log(chalk.red(`Mongoose schema error: ${error.message}`));
        res.status(400).send(error.message);
    }
})

app.post('/', async (req, res) => {
    try {
        const { body } = req;
        const instance = new Test(body);
        await instance.save();
        res.send(instance);
    } catch (error) {
        console.log(chalk.red(`Mongoose schema error: ${error.message}`));
        res.status(400).send(error.message);
    }
});


app.get('/count', async (req, res) => {
    try {
        const count = await Test.find().count();
        res.send({ count });
    } catch (error) {
        res.status(500).json({ error: 'you don\'t know math' });
    }
});

app.get('/select', async (req, res) => {
    try {
        const tests = await Test.find().select(['string', 'number', '-_id']);
        res.send(tests);
    } catch (error) {
        console.log(chalk.red(`Mongoose schema error: ${error.message}`));
        res.status(500).json({ error: 'you don\'t know math' });
    }
});

app.get('/sort', async (req, res) => {
    try {
        // the string will apper from A - Z and the number from highest to lowest
        const tests = await Test.find().sort({ string: 1, number: -1 });
        res.send(tests);
    } catch (error) {
        console.log(chalk.red(`Mongoose schema error: ${error.message}`));
        res.status(500).json({ error: 'you don\'t know math' });
    }
});


app.get('/selectAndSort', async (req, res) => {
    try {
        const tests = await Test.find()
            .select(['number', ['-_id']])// the _id is not going to return cuz there's a " - " before;
            .sort({ number: -1 })// then the numbers are gonna be sorted in decreasing order;
        res.send(tests);
    } catch (error) {
        console.log(chalk.red(`Mongoose schema error: ${error.message}`));
        res.status(500).json({ error: 'you don\'t know math' });
    }
})

//the plus in this metod is that it dosent filter the one from everything 
// but goes straight to the object by the id..
app.get('/findById/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const test = await Test.findById(id);
        res.send(test);
    } catch (error) {
        console.log(chalk.red(`Mongoose schema error: ${error.message}`));
        res.status(500).send(error.message);
    }
});
app.put('/findByIdAndUpdate/:id', async (req, res) => {
    try {
        const instance = await Test.findByIdAndUpdate(req.params._id, req.body, {
            new: true,
        });
        if (!instance) return res.status(404).send("not found");
        res.send(instance);
    } catch (error) {
        console.log(chalk.red(`Mongoose schema error: ${error.message}`));
        res.status(500).send(error.message);
    }
});

app.delete('/findByIdAndDelete/:id', async (req, res) => {
    try {
        const instance = await Test.findByIdAndDelete(req.params._id);
        if (!instance) return res.status(404).send("not found");
        res.send(instance);
    } catch (error) {
        console.log(chalk.red(`Mongoose schema error: ${error.message}`));
        res.status(500).send(error.message);
    }
});






const PORT = process.env.PORT || 8989;

app.listen(PORT, () => {
    console.log(chalk.green(`Server is running on port ${PORT}`));
    mongoose.connect('mongodb://127.0.0.1:27017/mongoose-sandbox')
        .then(() => console.log(chalk.green('Connected to MongoDB')))
        .catch(err => console.log(chalk.red(err)));
});