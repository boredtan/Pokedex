// Get Pokemon ability
const fetch = require("node-fetch");

module.exports = async (pokemonName) => {
    try {
        if(pokemonName) {
            const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=905%27");
            const data = await res.json();
            const nameList = [];
            for(var i = 0; i < data.results.length; i++) {
                nameList.push(data.results[i].name);
            }
            const queriedName = pokemonName.toLowerCase();
            const queriedDex = nameList.indexOf(queriedName) + 1;
            return queriedDex;
        }   
        else {
            console.log("Fake string detetected");
        }
        

        // -1 means cant be found
    }
    catch(e) {
        console.log(e);
    }
}

