const express = require('express');
const app = express();
const chalk = require('chalk');
const router = require('../cards/routes/cardsRestController');
// const { log } = require('console');

// app.use(express.json());
// app.use(express.text());
// app.use(express.static('./public', {
//     maxAge: 1000 * 60 * 60 * 24 * 7,
// }));

// Middleware Tasks
// 1. execute code (because it's a function)
// 2. optionally modify the request and response objects
// 3. end the request-response cycle
// 4. call the next middleware in the stack


// Middleware Types
// 1. Application-level middleware - I write what I wanna
// 2. Router-level middleware - I configure routes
// 3. Error-handling middleware - I handle errors
// 4. Built-in middleware - I use what's provided (like json, static, etc.)
// 5. Third-party middleware - I use what's available on npm (like morgan, helmet, etc.)


// first middleware
// app.use((req, res, next) => {
//     console.log(chalk.blue('This is the first middleware.'));
//     next(); // call the next middleware in the stack
// }, (req, res, next) => {
//     console.log(chalk.yellow('This is the first middleware, second function.'));
//     next(); // call the next middleware in the stack
// }, (req, res, next) => {
//     console.log(chalk.red('This is the first middleware, third function.'));
//     next(); // call the next middleware in the stack
// });

// route as a middleware
// app.get('/', (req, res, next) => {
//     console.log(chalk.green('in get / route'));
//     next();
// });

// middleware get headers
// app.use((req, res, next) => {
//     console.log(chalk.blue('This is a middleware.'));
//     console.log(req.headers);
//     next(); // call the to function in the route because there is no more middlewares
// });

// // middleware get params
// app.use('/:id', (req, res, next) => {
//     console.log(chalk.blue('This are the params:'));
//     console.log(req.params);
//     next(); // call the to function in the route because there is no more middlewares
// });

// // middleware get query params
// app.use((req, res, next) => {
//     console.log(chalk.blue('This is query:'));
//     console.log(req.query);
//     next(); // call the to function in the route because there is no more middlewares
// });

// // middleware to add custom ket in request
// app.use((req, res, next) => {
//     req.user = { id: 123, name: 'John Doe' };
//     console.log(chalk.blue('user in request:'), req.user);
//     next(); // call the to function in the route because there is no more middlewares
// });

// // middleware to get body
// app.use((req, res, next) => {
//     console.log(chalk.blue('this is the body.'), req.body);
//     next(); // call the to function in the route because there is no more middlewares
// });


// app.post('/', (req, res, next) => {
//     console.log(chalk.yellow('in post / route'));
//     res.send('Hello World');
//     next();
// });
// app.patch('/', (req, res, next) => {
//     console.log(chalk.magenta('in patch / route'));
//     next();
// });

// app.use('/', (res, req, next) => {
//     console.log(chalk.yellowBright('one'));
//     next();
// }, (res, req, next) => {
//     console.log(chalk.redBright('two'));
//     next();
// }, (res, req, next) => {
//     console.log(chalk.magentaBright('three'));

// })

// app.get('/', (req, res, next) => {
//     res.send({ name: "moshe", last: "banon" });
//     setTimeout(() => console.log("in send"), 2000);
// });

// app.use((req, res, next) => {
//     res.send("Hello world!");
//     req.user = { name: "John", _id: "123" };
//     console.log(chalk.yellowBright("request params:"), req.user);
//     next();
// })
// app.use((req, res, next) => {
//     console.log(chalk.yellowBright("request params:"), req.body);
//     next();
// })

app.use('/cards', router);

app.get('/', (req, res, next) => {
    try {
        res.status(200).send({ message: 'Hello World' });
    } catch (error) {
        res.status(500).json({ error: 'you don\'t know math' });
    }
    console.log(chalk.magenta(typeof Infinity));
});

app.use((err, req, res, next) => {
    console.error(chalk.redBright(err.message));
    res.status(500).send(err.message);
    res.send(err.message);
});
// app.use((req, res, next) => {
//     throw new Error("testing error middleware");
// });

// opens a listener for http requests
const PORT = process.env.PORT || 8181;
app.listen(PORT, () => {
    console.log(chalk.blueBright(`Listening on: http://localhost:${PORT}`));
});