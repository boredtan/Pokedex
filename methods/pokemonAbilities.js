// Get Pokemon ability data
const fetch = require("node-fetch");
module.exports = async (dexNumber) => {
    // Get ability names
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${dexNumber}`);
        const data = await res.json();
        const abilityNames = [];
        const abilityLink = [];
        const abilityDetails = [];
        for(var i = 0; i < data.abilities.length; i++) {
            abilityNames.push(data.abilities[i].ability.name);
            abilityLink.push(data.abilities[i].ability.url);
        }
        // Get ability details
        const response = await Promise.all(
            abilityLink.map(url => fetch(url).then(res => res.json()))
        )
        for(var i = 0; i < response.length; i++) {
            for(var j = 0; j < response[i].flavor_text_entries.length; j++) {
                if(response[i].flavor_text_entries[j].language.name == "en" && response[i].flavor_text_entries[j].version_group.name == "sword-shield") {
                    abilityDetails.push(response[i].flavor_text_entries[j].flavor_text);
                }
            }
        }
        const abilityData = [];
        abilityData.push(abilityDetails);
        abilityData.push(abilityNames);
        return abilityData;
    }
    catch(e) {
        console.log(e);
    }
}
