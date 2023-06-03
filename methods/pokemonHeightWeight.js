// Get Pokemon ability
const fetch = require("node-fetch");

module.exports = async (dexNumber) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${dexNumber}`);
        const data = await res.json();
        const weight = data.weight / 10;
        const height = data.height / 10;
        const measurement = [];
        measurement.push(height);
        measurement.push(weight);
        return measurement;
    }
    catch(e) {
        console.log(e);
    }
}

