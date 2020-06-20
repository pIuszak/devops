const keys = require('./keys');
const redis = require('redis');
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const app = express()
app.use(cors());
app.use(bodyParser.json());

console.log(keys);

// postgres client setup

const pgClient = new Pool({
    host: keys.pgHost,
    port: keys.pgPort,
    user: keys.pgUser,
    password: keys.pgPassword,
    database: keys.pgDatabase
});

setTimeout(() => {
    pgClient
        .query('CREATE TABLE IF NOT EXISTS cache(beer FLOAT, prom FLOAT)')
        .catch(err => console.log(err));
}, 3000);


const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
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
var time = 0.015;
var weight = 75;

function bac(beer) {

    var drinkTotal = ((beer * beerAlcoholContent));
    var total = (drinkTotal * absortion);
    var result = ((total) / (weight) - (time * timePass));
    return result;
}


app.get('/bac/:beer', async (req, res) => {

    const beer = req.params.beer
    const prom = parseFloat(beer)

    var out = 0;

    redisClient.get(beer, (err, alreadyComputed) => {
        if (!alreadyComputed) {
            out = bac(prom);
            saveResultInDb(prom, out);
            redisClient.set(beer, out.toString());
        } else {
            out = "(C)"+alreadyComputed;
        }

        res.send(`${out} ‰`);
    });
});

app.get('/:status/', async (req, res) => {

    pgClient.query('SELECT * FROM cache;', (err, result) => {
        if (result.rows) {
            res.send(result.rows);
        } else {
            res.send([]);
        }
    });
});


app.get('/:beer/:debug', async (req, res) => {
    const nokKey = req.params.beer
    const beeer = parseFloat(nokKey)
    res.send(`${isInDb(beeer)} from cache`);

});

function isInDb(b) {
     pgClient.query(`SELECT * FROM cache WHERE beer = ${b}`, (err, result) => {
             if (result.rows) {
                res.send(parseFloat(result.rows[0]["prom"].toString()));
             } else {
                 result = bac(beeer);
                 saveResultInDb(beeer, result);
                 res.send(`${result} ‰`);
             }
         }
     ).catch(pgError => console.log(pgError));
}

function saveResultInDb(beer, prom) {

    pgClient.query('CREATE TABLE IF NOT EXISTS cache(beer FLOAT, prom FLOAT)');
    pgClient
        .query(`INSERT INTO cache (beer, prom) VALUES (${beer}, ${prom})`)
        .catch(pgError => console.log(pgError));
}

const appPort = 5000;


app.listen(appPort, err => {
    console.log(`Backend app listening on port ${appPort}`);
})