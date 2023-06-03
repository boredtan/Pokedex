// Get Pokemon type
const fetch = require("node-fetch");

module.exports = async (dexNumber) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${dexNumber}`);
        const data = await res.json();

        if(data.varieties[1] == undefined) {
            return undefined;
        }
        else {
            const varietyName = [];
            const id = [];
            const pokemonVarieties = [];
            for(var i = 1; i < data.varieties.length; i++) {
                varietyName.push(data.varieties[i].pokemon.name);
                id.push(data.varieties[i].pokemon.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', ''));
            }
            pokemonVarieties.push(varietyName);
            pokemonVarieties.push(id);
            return pokemonVarieties;
        }
    }
    catch(e) {
        console.log(e);
    }
}

