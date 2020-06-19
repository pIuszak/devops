const express = require('express');
const app = express();

const {v4: uuidv4} = require('uuid');

const appId = uuidv4();

const port = 5000;

app.get('/', (req,resp) => {
    resp.send(`[${appId} Hellp from my backend app]`);
});

app.listen(port,err => {
    console.log(`Listening on port ${port}`);
});