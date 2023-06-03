// Get Pokemon ability
const fetch = require("node-fetch");

module.exports = async (dexNumber) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${dexNumber}`);
        const data = await res.json();
        const stats = [];
        for(var i = 0; i < data.stats.length; i++) {
            stats.push(data.stats[i].base_stat);
        }
        // return data.stats;
        return stats;
    }
    catch(e) {
        console.log(e);
    }
}

