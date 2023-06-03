// Get Pokemon ability
const fetch = require("node-fetch");

module.exports = async (dexNumber) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${dexNumber}`);
        const data = await res.json();
            for(var i = 0; i <data.genera.length; i++) {
                if(data.genera[i].language.name == "en") {
                    const category = data.genera[i].genus;
                    return category;
                }
            }
    }
    catch(e) {
        console.log(e);
    }
}

