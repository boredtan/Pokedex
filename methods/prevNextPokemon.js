const getPokemonName = require('./pokemonName');
module.exports = async (dexNumber) => {
    try {
        const data = [];
        const prevData = [];
        const nextData = [];
        const pokemonNames = await getPokemonName();

        // Function to get previous dex number and Pokemon name
        const getPrev = async (dexNumber) => {
            const prevNum = parseInt(dexNumber)-1;
            const prevPokemon = pokemonNames[prevNum-1].name;
            prevData.push(prevNum);
            prevData.push(prevPokemon);
        }

        // Function to get next dex number and Pokemon name
        const getNext = async (dexNumber) => {
            const nextNum = parseInt(dexNumber)+1;
            const nextPokemon = pokemonNames[nextNum-1].name;
            nextData.push(nextNum);
            nextData.push(nextPokemon);
        }

        // First pokemon
        if(dexNumber == 1) {
            getNext(dexNumber);
            data.push(undefined);
            data.push(nextData);
            return data;
        }

        // Last pokemon
        else if(dexNumber == 905) {
            getPrev(dexNumber);
            data.push(prevData);
            data.push(undefined);
            return data;
        }

        // For remaining pages
        else {
            getPrev(dexNumber);
            getNext(dexNumber);
            data.push(prevData);
            data.push(nextData);
            return data;
        }
        
    }
    catch(e) {
        console.log(e);
    }
}   