const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
    pokemonName: {
        type: String,
        required: true
    },
    
    pokemonComment: {
        type: String
    }
})

const Favourite = mongoose.model('Favourite', favouriteSchema);
module.exports = Favourite;