const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
        min: [0, 'Count must be a positive number']
    },

    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    log: [{
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

    }]
});

module.exports = mongoose.model('LogSchema', logSchema);