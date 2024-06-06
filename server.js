const chalk = require("chalk");
const express = require("express");
// The express() function initializes and returns an instance of the Express application, which is typically stored in a variable.
const { handleError } = require("./utils/handleErrors");
const app = express();
const router = require("./routes/router");
const connectToDB = require("./db/dbService.js")
const cors = require("./cors/cors");
const logger = require("./logger/loggerService");
const config = require("config");
const { generateInitialData, generateInitialDataCards, generateInitialDataUsers } = require("./initialData/initialDataService.js");

// with "use()" we can mount (להטעין\להוסיף) middleware function's (the function's that can access the "req" "res" body's) to the applications instance
app.use(cors); // good for security purposes
app.use(logger);
app.use(express.json());
app.use(express.static("./public"));
app.use(router);

app.use((err, req, res, next) => {
    handleError(res, 500, err.message);
    next();
});


const PORT = config.get('PORT')
app.listen(PORT, async () => {
    console.log(chalk.magentaBright(`Listening on: http://localhost:${PORT}`))
    await connectToDB();
    generateInitialDataCards();
    generateInitialDataUsers();
});
