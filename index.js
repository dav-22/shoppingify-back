const express = require("express");
const favicon = require("serve-favicon");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const apiRouter = require('./src/routes/api'); 

require('./src/db-config');

const port = 3000;
dotenv.config();
const app = express();

app.use(favicon('public/favicon.ico'));
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRouter);

app.listen(port, (req, res) => {
    console.log(`Server running on http://localhost:${port}`);
})

app.get('/', (req, res) => {
    res.send('SERVER OK');

});
