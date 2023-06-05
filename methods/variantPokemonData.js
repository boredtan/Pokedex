const fetch = require("node-fetch");
const getPokemonAbilities = require('./pokemonAbilities');
const getPokemonStats = require('./pokemonStats');
const getPokemonType = require('./pokemonType');
const getPokemonHeightWeight = require('./pokemonHeightWeight');


module.exports = async (dexNumber) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${dexNumber}`);
        const data = await res.json();
        const name = (data.name);
        const prevName = (data.species.name);
        const prevDex = (data.species.url).replace('https://pokeapi.co/api/v2/pokemon-species/', '').replace('/', '');
        const pokemonData = [];
        const pokemonAbilities = await getPokemonAbilities(dexNumber);
        const pokemonStats = await getPokemonStats(dexNumber);
        const pokemonType = await getPokemonType(dexNumber);
        const pokemonHeightWeight = await getPokemonHeightWeight(dexNumber);
        pokemonData.push(name);
        pokemonData.push(pokemonAbilities);
        pokemonData.push(pokemonStats);
        pokemonData.push(pokemonType);
        pokemonData.push(pokemonHeightWeight);
        pokemonData.push(prevName);
        pokemonData.push(prevDex);
        return pokemonData;
    }
    catch(e) {
        console.log(e);
    }
}   
