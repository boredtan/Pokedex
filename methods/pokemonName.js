// Get Pokemon name
const fetch = require("node-fetch");

module.exports = async () => {
    try {
        // const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151%27");
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=905%27");
        const data = await res.json();
        return data.results;
    }
    catch(e) {
        console.log(e);
    }
}

