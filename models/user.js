const mongoose = require('mongoose');

const coffeeSchema = mongoose.Schema({
  sort: {
    type: String,
    required: true,
  },
  variety: {
    type: String,
    required: true,
  },
  grainProcessing: {
    type: String,
    required: true,
  },
  roastingLevels: {
    type: String,
    required: true,
  },
  grindingMethods: {
    type: String,
    required: true,
  },
  preparationMethods: {
    type: String,
    required: true,
  },
  coffeeAppliances: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  coffeeBeverages: {
    type: String,
    required: true,
  },
});
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  coffees: [coffeeSchema],
  });

const User = mongoose.model('User', userSchema);

module.exports = User;