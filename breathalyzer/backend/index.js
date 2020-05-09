const express = require('express');
const redis = require('redis');
const process = require('process');
const bodyParser = require('body-parser');
const cors = require('cors');
const keys = require('./keys.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());

console.log(keys);

const { Pool } = require('pg');
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});
    pgClient.on('error', () => console.log('Lost PG connection'));

pgClient
  .query('CREATE TABLE IF NOT EXISTS values (number INT)')
  .catch(err => console.log(err));

//const redis = require('redis');
//const redis = require('redis');
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
    retry_strategy: () => 1000
});

const port = 5000;
app.listen(port, err => {
  console.log(`Listening on port ${port}`);
});



app.get('/', (req, res) => {
        res.send('Hello from Backend!');
});

