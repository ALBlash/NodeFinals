const express = require('express');
const app = express();
const cors = require("cors");


//The CORS (Cross-Origin Resource Sharing) library is used to
// enable controlled access to resources hosted on a different domain in web applications,
// improving security by specifying which origins can access those resources.

// app.use(cors({
//     origin: ['http://127.0.0.1:5500', 'http://localhost:3000'],
//     optionsSuccessStatus: 200
// }));


// app.get('/', (req, res) => {
//     res.send({ message: "Hello!" });
// });

// app.listen(3001, () => {
//     console.log('listening on port 3001');
// });

app.use(
    cors({
        origin: ["http://127.0.0.1:5500", "http://localhost:3000"],
        optionsSuccessStatus: 200,
    })
);

module.exports = app;