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

const {Pool} = require('pg');
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

//create input for weight
var weight = 0;

//beer alcohol content
var beerAlcoholContent = .54;

//wine alcohol content
var wineAlcoholContent = .6;

//shot alcohol content
var shotAlcoholContent = .6;

//average absortion rate
var absortion = 7.5;

//per hour since last drink
var timePass = 0.015;

function bac(beer, shot, wine, weight, time) {

    var drinkTotal = ((beer * beerAlcoholContent) + (wine * wineAlcoholContent) + (shot * shotAlcoholContent));
    var total = (drinkTotal * absortion);
    var result = ((total) / (weight) - (time * timePass));
    return result;
}

app.get('/:beer/:shot/:wine/:weight/:time', (req, res) => {
    var beer = parseInt(req.params.beer);
    var shot = parseInt(req.params.shot);
    var wine = parseInt(req.params.wine);
    var weight = parseInt(req.params.weight);
    var time = parseInt(req.params.time);
    var ret = (bac(beer, shot, wine, weight, time));
    res.send(`${ret} ‰`);
});
app.get('/:status/', async (req, res) => {
    const result = await pgClient.query('SELECT * FROM values');
    res.send({gcd: result.rows})
});

app.get('/droptable/', (req, res) => {
    //console.log(res.send('XD'));
    res.send('XD')


});

app.get('/results', async (req, res) => {

});

