// Get Pokemon name
const fetch = require("node-fetch");
const getPokemonName = require('./pokemonName');


module.exports = async (data) => {
    try {
        // const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151%27");
        // const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=905%27");
        // const data = await res.json();
        const nameList = await getPokemonName();
        const names = [];
        const favouriteNames = [];
        const dexNumbers = [];
        const comments = [];
        const favouriteData = [];
        const id = [];
        // Store names from namelist
        for(var i = 0; i < nameList.length; i++) {
            names.push(nameList[i].name);
        }
        // Store names from favourite database
        for(var i = 0; i < data.length; i++) {
            favouriteNames.push(data[i].pokemonName);
        }
        // Get dex number of pokemon in database
        for(var i = 0; i < favouriteNames.length; i++) {
           let dexNumber = names.indexOf(favouriteNames[i]);
           dexNumber += 1;
           dexNumbers.push(dexNumber);
        }
        // Store comments from favourite database
        for(var i = 0; i < data.length; i++) {
            comments.push(data[i].pokemonComment);
        }
        // Store id from favourite database
        for(var i = 0; i < data.length; i++) {
            id.push(data[i]._id);
        }
        favouriteData.push(favouriteNames);
        favouriteData.push(dexNumbers);
        favouriteData.push(comments);
        favouriteData.push(id);
        return (favouriteData);

    }
    catch(e) {
        console.log(e);
    }
}

