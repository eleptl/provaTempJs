const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const db = require('./knexConfig');
const cors = require('cors');

app.use(cors());

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

// Parse incoming request bodies in JSON format
app.use(bodyParser.json());

app.get('/companies', async (req, res) => {
    try {
        const result = await db('companies').select('*');
        res.json(result);
        console.log(result);
    } catch (e) {
        console.error(e);
    }
})