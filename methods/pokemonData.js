const fetch = require("node-fetch");
const getPokemonName = require('./pokemonName');
const getPokemonEvolution = require('./pokemonEvolution');
const getPokemonAbilities = require('./pokemonAbilities');
const getPokemonStats = require('./pokemonStats');
const getPokemonType = require('./pokemonType');
const getPokemonSummary = require('./pokemonSummary');
const getPokemonVarieties = require('./pokemonVarieties');
const getPokemonGenera = require('./pokemonGenera');
const getPokemonHeightWeight = require('./pokemonHeightWeight');


module.exports = async (dexNumber) => {
    try {
        const pokemonData = [];
        const pokemonNames = await getPokemonName();
        const pokemonName = pokemonNames[dexNumber-1].name;
        const pokemonEvolution = await getPokemonEvolution(dexNumber);
        const pokemonAbilities = await getPokemonAbilities(dexNumber);
        const pokemonStats = await getPokemonStats(dexNumber);
        const pokemonType = await getPokemonType(dexNumber);
        const pokemonSummary = await getPokemonSummary(dexNumber);
        const pokemonVarieties = await getPokemonVarieties(dexNumber);
        const pokemonGenera = await getPokemonGenera(dexNumber);
        const pokemonHeightWeight = await getPokemonHeightWeight(dexNumber);
        pokemonData.push(pokemonName);
        pokemonData.push(pokemonEvolution);
        pokemonData.push(pokemonAbilities);
        pokemonData.push(pokemonStats);
        pokemonData.push(pokemonType);
        pokemonData.push(pokemonSummary);
        pokemonData.push(pokemonVarieties);
        pokemonData.push(pokemonGenera);
        pokemonData.push(pokemonHeightWeight);
        return pokemonData;
    }
    catch(e) {
        console.log(e);
    }
}   
