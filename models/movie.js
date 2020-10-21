const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    actors: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Actor'
    }],
    rating: {
        validate: {
            validator: function (newAge) {
                if (newAge >= 1 && newAge <= 5)
                    return true;
                else return false
            },
            message: 'Movie Rating should be between 1-5'
        },
        type: Number,
    }
});

module.exports = mongoose.model('Movie', movieSchema);