const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
    },
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
        required: true, 
        default: Date.now()
    }
    }
    );

module.exports = mongoose.model('ExerciseSchema', exerciseSchema);