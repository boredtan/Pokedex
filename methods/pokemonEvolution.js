// Get Pokemon data
const fetch = require("node-fetch");

// module.exports = async (dexNumber) => {
//     try {
//         const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${dexNumber}`);
//         const data = await res.json();
//         const evolutionLink = data.evolution_chain.url;
//         const evolutionData = await fetch(evolutionLink);
//         const chainData = await evolutionData.json();
//         const evolutionChain = [];
        

//         // One evolution
//         if(chainData.chain.evolves_to[0] === undefined) {
//             const firstEvolution = chainData.chain.species.name;
//             evolutionChain.push(firstEvolution);
//             return (evolutionChain);
//         }
//         else if(chainData.chain.evolves_to[0] !== undefined) {
//             // Two evolutions
//             if(chainData.chain.evolves_to[0].evolves_to[0] == undefined) {
//                 // One form
//                 if(chainData.chain.evolves_to[1] === undefined) {
//                     const firstEvolution = chainData.chain.species.name;
//                     const secondEvolution = chainData.chain.evolves_to[0].species.name;
//                     evolutionChain.push(firstEvolution);
//                     evolutionChain.push(secondEvolution);
//                     return (evolutionChain);
//                 }
//                 // Multiple forms
//                 else {
//                     const firstEvolution = chainData.chain.species.name;
//                     evolutionChain.push(firstEvolution);
//                     for(var i = 0; i < chainData.chain.evolves_to.length; i++) {
//                         const secondEvolution = chainData.chain.evolves_to[i].species.name;
//                         evolutionChain.push(secondEvolution);
//                     }
//                     return (evolutionChain);
//                 }
//             }
//             // Three evolution
//             else {
//                 // One form
//                 if(chainData.chain.evolves_to[0].evolves_to[1] === undefined) {
//                     const firstEvolution = chainData.chain.species.name;
//                     const secondEvolution = chainData.chain.evolves_to[0].species.name;
//                     const finalEvolution = chainData.chain.evolves_to[0].evolves_to[0].species.name;
//                     const evolutionChain = []
//                     evolutionChain.push(firstEvolution);
//                     evolutionChain.push(secondEvolution);
//                     evolutionChain.push(finalEvolution);
//                     return (evolutionChain);
//                 }
//                 // Two forms
//                 else {
//                     const firstEvolution = chainData.chain.species.name;
//                     const secondEvolution = chainData.chain.evolves_to[0].species.name;
//                     const thirdEvolution = chainData.chain.evolves_to[0].evolves_to[0].species.name;
//                     const finalEvolution = chainData.chain.evolves_to[0].evolves_to[1].species.name;
//                     const evolutionChain = []
//                     evolutionChain.push(firstEvolution);
//                     evolutionChain.push(secondEvolution);
//                     evolutionChain.push(thirdEvolution);
//                     evolutionChain.push(finalEvolution);
//                     return (evolutionChain);
//                 }
//             }
//         }
//     }
//     catch(e) {
//         console.log(e);
//     }
// }


module.exports = async (dexNumber) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${dexNumber}`);
        const data = await res.json();
        const evolutionLink = data.evolution_chain.url;
        const evolutionData = await fetch(evolutionLink);
        const chainData = await evolutionData.json();
        const evolutionChain = [];
        const firstChain = [];
        const secondChain = [];
        const thirdChain = [];

        // Get dex number from url
        const getNumber = (imageUrl) => {
            const newUrl = imageUrl.replace('https://pokeapi.co/api/v2/pokemon-species/', '').replace('/', '');
            return newUrl;
        }


        // One evolution
        if(chainData.chain.evolves_to[0] === undefined) {
            firstChain.push({name: chainData.chain.species.name, dexNumber: getNumber(chainData.chain.species.url)})
            evolutionChain.push(firstChain);
            return (evolutionChain);
        }
        else if(chainData.chain.evolves_to[0] !== undefined) {
            // Two evolutions
            if(chainData.chain.evolves_to[0].evolves_to[0] == undefined) {
                // One form
                if(chainData.chain.evolves_to[1] === undefined) {
                    firstChain.push({name: chainData.chain.species.name, dexNumber: getNumber(chainData.chain.species.url)})
                    secondChain.push({name: chainData.chain.evolves_to[0].species.name, dexNumber: getNumber(chainData.chain.evolves_to[0].species.url)});
                    evolutionChain.push(firstChain);
                    evolutionChain.push(secondChain);
                    return (evolutionChain);
                }
                // Multiple forms
                else {
                    firstChain.push({name: chainData.chain.species.name, dexNumber: getNumber(chainData.chain.species.url)})
                    evolutionChain.push(firstChain);
                    for(var i = 0; i < chainData.chain.evolves_to.length; i++) {
                        secondChain.push({name: chainData.chain.evolves_to[i].species.name, dexNumber: getNumber(chainData.chain.evolves_to[i].species.url)});
                    }
                    evolutionChain.push(secondChain);
                    return (evolutionChain);
                }
            }
            // Three evolution
            else {
                // One form
                if(chainData.chain.evolves_to[0].evolves_to[1] === undefined) {
                    firstChain.push({name: chainData.chain.species.name, dexNumber: getNumber(chainData.chain.species.url)})
                    secondChain.push({name: chainData.chain.evolves_to[0].species.name, dexNumber: getNumber(chainData.chain.evolves_to[0].species.url)});
                    thirdChain.push({name: chainData.chain.evolves_to[0].evolves_to[0].species.name, dexNumber: getNumber(chainData.chain.evolves_to[0].evolves_to[0].species.url)});
                    evolutionChain.push(firstChain);
                    evolutionChain.push(secondChain);
                    evolutionChain.push(thirdChain);
                    return (evolutionChain);
                }
                // Two forms
                else {
                    firstChain.push({name: chainData.chain.species.name, dexNumber: getNumber(chainData.chain.species.url)})
                    secondChain.push({name: chainData.chain.evolves_to[0].species.name, dexNumber: getNumber(chainData.chain.evolves_to[0].species.url)});
                    thirdChain.push({name: chainData.chain.evolves_to[0].evolves_to[0].species.name, dexNumber: getNumber(chainData.chain.evolves_to[0].evolves_to[0].species.url)});
                    thirdChain.push({name: chainData.chain.evolves_to[0].evolves_to[1].species.name, dexNumber: getNumber(chainData.chain.evolves_to[0].evolves_to[1].species.url)});
                    evolutionChain.push(firstChain);
                    evolutionChain.push(secondChain);
                    evolutionChain.push(thirdChain);
                    return (evolutionChain);
                }
            }
        }
    }
    catch(e) {
        console.log(e);
    }
}

