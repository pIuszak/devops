const express = require("express");
const redis = require("redis");
const process = require("process");

const app = express();

const client = redis.createClient({
    host: "redis-server",
    port: 6379
});

function NWD(a, b) {
    return b ? NWD(b, a % b) : a
}

client.set('nwd', 0);

app.get('/nwd/:l1&:l2', (req, res) => {
    //res.send("XD");
    client.get('nwd', (err, a_val, b_val) => {
        resp.send('NWD: ' + a_val + " " + b_val + " = " + NWD(a_val, b_val));
        client.set('counter', NWD(a_val, b_val));
    });
});

app.listen(8080, () => {
    console.log("Listening to port 8080")
});
