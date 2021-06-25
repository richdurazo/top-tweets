const express = require('express');
const app = express();
const axios = require('axios');
require('dotenv').config();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    if (req.method == "OPTIONS") {
        res.writeHead(200);
        res.end();
    } else {
        next();
    }
});

app.get('/list', (req, res, next) => {
    const enteredFilter = req.query['q'];
    const maxId = req.query['max_id'];
    let uri = `${process.env.REQUEST_URL}/search/tweets.json?count=5&result_type=popular&q=${enteredFilter}`
    uri = maxId ? uri + `&max_id=${maxId}` : uri;
    axios.get(uri, {
        headers: {
            'Authorization': `Bearer ${process.env.TOKEN}`,
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (response.status === 200) {
            res.status(200).send(response.data);
        }
    })
    .catch(err => {
        res.status(500).send(err);
    })
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on ${PORT}`));