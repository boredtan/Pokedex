// Import modules
const fetch = require("node-fetch");
const express = require('express');
const app = express();
const path = require('path');
const getPokemonName = require('./methods/pokemonName');
const getPokemonData = require('./methods/pokemonData');


// Set file path and view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'stylesheet')));
app.use(express.static(path.join(__dirname, 'methods')));
// Routes
app.get('/', async (req, res) => {
    const pokemonName = await getPokemonName();
    res.render('index', {pokemonName});
})

app.get('/:id', async (req, res) => {
    const dexNumber = req.params.id;
    const pokemonData = await getPokemonData(dexNumber);
    const prevNum = parseInt(dexNumber)-1;
    const nextNum = parseInt(dexNumber)+1;
    res.render('pokemon', {name:pokemonData[0], dexNumber, pokemonEvolution:pokemonData[1] ,pokemonAbilities:pokemonData[2], pokemonStats:pokemonData[3], pokemonType:pokemonData[4], pokemonSummary: pokemonData[5], pokemonVarieties: pokemonData[6], pokemonCategory: pokemonData[7], pokemonMeasurement: pokemonData[8], prevNum, nextNum});
})

app.listen(3000, () => {
    console.log("Serving on Port 3000");
})
 