// Import modules
const fetch = require("node-fetch");
const express = require('express');
const app = express();
const path = require('path');
const getPokemonName = require('./methods/pokemonName');
const getPokemonData = require('./methods/pokemonData');
const getVariantPokemonData = require('./methods/variantPokemonData');
const getQueriedDex = require('./methods/queriedDex');
const getFavouritesData = require('./methods/favouritesData');
const bodyParser = require('body-parser');
const Favourite = require('./models/favourite');

// Connect to mongoose
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/favourite');
    console.log("Connected to mongoose");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Set file path and view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'stylesheet')));
app.use(express.static(path.join(__dirname, 'methods')));
app.use(express.static(path.join(__dirname, 'assets')));

// Routes
app.get('/', async (req, res) => {
    try {
        const nameList = await getPokemonName();
        const pokemonName = await getPokemonName();
        res.render('index', {pokemonName, nameList});
    }
    catch(e) {
        res.render('error');
    }
})

app.get('/favourite', async (req, res) => {
    try {

        const nameList = await getPokemonName();
        // const pokemonName = await getPokemonName();
        const favourites = await Favourite.find({});
        const favouritesData = await getFavouritesData(favourites);
        res.render('favourite', {nameList, favouritesData});
    }
    catch(e) {
        res.render('error');
    }
})

app.get('/favourite/addPokemon', async (req, res) => {
    try {
        const nameList = await getPokemonName();
        const pokemonName = await getPokemonName();
        res.render('addPokemon', {pokemonName, nameList});
    }
    catch(e) {
        res.render('error');
    }
})

app.get('/favourite/:id', async (req, res) => {
    try {
        const nameList = await getPokemonName();
        const pokemonName = await getPokemonName();
        const {id} = req.params;
        const favDetails = await Favourite.findById(id);
        const dexNumber = await getQueriedDex(favDetails.pokemonName);

        res.render('favouritePokemon', {pokemonName, nameList, favDetails});
    }
    catch(e) {
        res.render('error');
    }
})

app.post('/favourite', async (req, res) => {
    try {
        const newFavourite = new Favourite(req.body);
        await newFavourite.save();
        res.redirect('favourite');
    }
    catch(e) {
        res.render('error');
    }
})

app.get('/:id', async (req, res) => {
    try {
        let dexNumber;
        const queriedDex = await getQueriedDex(req.query.q);
        if(queriedDex) {
            dexNumber = queriedDex;
        }
        else {
            dexNumber = req.params.id;
        }
        const pokemonData = await getPokemonData(dexNumber);
        const nameList = await getPokemonName();
        
        
        res.render('pokemon', {name:pokemonData[0], dexNumber, pokemonEvolution:pokemonData[1], 
                    pokemonAbilities:pokemonData[2], pokemonStats:pokemonData[3], pokemonType:pokemonData[4],
                    pokemonSummary: pokemonData[5], pokemonVarieties: pokemonData[6], pokemonCategory: pokemonData[7],
                    pokemonMeasurement: pokemonData[8], prevNext: pokemonData[9], nameList: nameList});
    }
    catch(e) {
        const nameList = await getPokemonName();
        res.render('error', {nameList});
    }
})


app.get('/:id/:variant', async (req, res) => {
    try {
        const nameList = await getPokemonName();
        const dexNumber = req.params.variant;
        const variantData = await getVariantPokemonData(req.params.variant);
        res.render('pokemonVariant', {name: variantData[0], dexNumber: dexNumber, prevName:variantData[5], prevId:variantData[6], pokemonAbilities: variantData[1], pokemonStats: variantData[2], pokemonType: variantData[3], pokemonMeasurement: variantData[4], nameList});
    }
    catch(e) {
        res.render('error');
    }
 })

app.get("*", async (req, res) => {
    const nameList = await getPokemonName();
    res.render('error', {nameList});
})

app.listen(3000, () => {
    console.log("Serving on Port 3000");
})
 