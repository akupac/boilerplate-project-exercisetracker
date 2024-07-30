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

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  log: {type: [exerciseSchema], required: true}, // exerciseSchema
});

module.exports = mongoose.model('userModel', userSchema);