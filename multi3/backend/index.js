const keys = require('./keys');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres client setup
const { Pool } = require('pg');
const pgClient = new Pool({
 user: keys.pgUser,
 host: keys.pgHost,
 database: keys.pgDatabase,
 password: keys.pgPassword,
 port: keys.pgPort
});

console.log(keys);
pgClient.on('error', () => console.log('Lost PG connection'));

pgClient
  .query('CREATE TABLE IF NOT EXISTS values (number INT)')
  .catch(err => console.log(err));

const client = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort
});

app.get('/NWD/:num1/:num2', (req, res) => {
  const a = req.params.a;
  const b = req.params.b;

  if(!num1 || !num2) {
    res.send("Please inser two numbers");
    return
  }

  const key = `${Math.min(a, b)}_${Math.max(a, b)}`;

	client.get(key, (err, value) => {
      if(!value) {
        value = NWD(a, b);
      }
		  res.send(`Greatest common divisor of ${a} & ${b} is ${value}`);
		  client.set(key, parseInt(value));
		});

});

function NWD(a, b) {
    return b ? NWD(b, a % b) : a
}

app.get('/results', async (req, res) => {
  const result = await pgClient.query('SELECT * FROM values');
  res.send({gcd: result.rows})
});

const port = 5000;
app.listen(port, err => {
  console.log(`Backend Listening op port ${port}`);
});
