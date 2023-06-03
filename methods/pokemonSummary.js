// Get Pokemon ability
const fetch = require("node-fetch");

module.exports = async (dexNumber) => {
    // try {
    //     const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${dexNumber}`);
    //     const data = await res.json();
    //     if(dexNumber < 152) {
    //         const summary = data.flavor_text_entries[10].flavor_text.replace(/\n/g, ' ').replace('\u000c', ' ').replace('POKéMON', 'Pokemon');
    //         return summary;
    //     }

    //     else if(dexNumber < 649){
    //         const summary = data.flavor_text_entries[0].flavor_text.replace(/\n/g, ' ').replace('\u000c', ' ').replace('POKéMON', 'Pokemon');
    //         return summary;
    //     }
    //     else if(dexNumber == 649){
    //         const summary = data.flavor_text_entries[5].flavor_text.replace(/\n/g, ' ').replace('\u000c', ' ').replace('POKéMON', 'Pokemon');
    //         return summary;
    //     }
    //     else if(dexNumber < 721){
    //         const summary = data.flavor_text_entries[6].flavor_text.replace(/\n/g, ' ').replace('\u000c', ' ').replace('POKéMON', 'Pokemon');
    //         return summary;
    //     }
    //     else if(dexNumber < 749){ries[7].flavor_text.replace(/\n/g, ' ').replace('\u000c', ' ').replace('POKéMON', 'Pokemon');
    //         return summary;
    //     }
    //     else if(dexNumber == 750){
    //         const summary = data.flavor_text_entries[8].flavor_text.replace(/\n/g, ' ').replace('\u000c', ' ').replace('POKéMON', 'Pokemon');
    //         return summary;
    //     }
    //     else if(dexNumber == 792){
    //         const summary = data.flavor_text_entries[8].flavor_text.replace(/\n/g, ' ').replace('\u000c', ' ').replace('POKéMON', 'Pokemon');
    //         return summary;
    //     }
    //     else if(dexNumber < 800){
    //         const summary = data.flavor_text_entries[7].flavor_text.replace(/\n/g, ' ').replace('\u000c', ' ').replace('POKéMON', 'Pokemon');
    //         return summary;
    //     }
    //     else if(dexNumber == 800){
    //         const summary = data.flavor_text_entries[8].flavor_text.replace(/\n/g, ' ').replace('\u000c', ' ').replace('POKéMON', 'Pokemon');
    //         return summary;
    //     }
    //     else if(dexNumber < 899) {
    //         const summary = data.flavor_text_entries[7].flavor_text.replace(/\n/g, ' ').replace('\u000c', ' ').replace('POKéMON', 'Pokemon');
    //         return summary;
    //     }

    //     else {
    //         const summary = data.flavor_text_entries[0].flavor_text.replace(/\n/g, ' ').replace('\u000c', ' ').replace('POKéMON', 'Pokemon');
    //         return summary;
    //     }
    // }
    // catch(e) {
    //     console.log(e);
    // }
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${dexNumber}`);
        const data = await res.json();
        if(dexNumber < 152) {
            const summary = data.flavor_text_entries[10].flavor_text.replace(/\n/g, ' ').replace('\u000c', ' ').replace('POKéMON', 'Pokemon');
            return summary;
        }
        else {
            for(var i = 0; i <data.flavor_text_entries.length; i++) {
                if(data.flavor_text_entries[i].language.name == "en") {
                    const summary = data.flavor_text_entries[i].flavor_text.replace(/\n/g, ' ').replace('\u000c', ' ').replace('POKéMON', 'Pokemon');
                    return summary;
                }
            }
        }
    }
    catch(e) {
        console.log(e);
    }
}

