const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true,
        min: [0, 'Duration must be a positive number']
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('exerciseModel', exerciseSchema);