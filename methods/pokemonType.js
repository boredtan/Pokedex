// Get Pokemon type
const fetch = require("node-fetch");

module.exports = async (dexNumber) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${dexNumber}`);
        const data = await res.json();
        return data.types;
    }
    catch(e) {
        console.log(e);
    }
}

