const mongoose = require('mongoose');
const preparationAndMachines = new mongoose.schema({
    preparationMethods: {
        type: String,
    required: true,
    },
    espressoMachinesByMechanism: {
        type: String,
    required: true,
    },
    espressoMachinesByAutomatizationLevel: {
        type: String,
    required: true,
    },
})
const CoffeeAlternativeNamesByRoastingLevels = new mongoose.Schema({
  lightRoast: {
    type: String,
    required: true,
  },
  mediumRoast {
    type: String,
    required: true,
  },
  mediumDarkRoast {
    type: String,
    required: true,
  },
  darkRoast {
    type: String,
    required: true,
  },
});
const cultivationAndProcessingPhases = new mongoose.Schema({  
  picking: {
    type: String,
    required: true,
  },
  grainProcessing: {
    type: String,
  },
  roastingScale: {
    type: ObjectId,
    ref: "Profile",
  },
  grindingMethods: {
    type: [ObjectId],
    ref: "Ingredient",
  },
});
const coffeeSchema = new mongoose.Schema({
  sort: {
    type: String,
    required: true,
  },
  variety: {
    type: String,
    required: true,
  },
  aroma: {
    type: String,
    required: true,
  },
  coffeeRoad: {
    type: String,
    required: true,
  },
  cultivationAndProcessingPhases: {
    type: String,
    required: true,
  },
  preparationAndMachines: {
    type: String,
    required: true,
  },
  mix: {
    type: String,
    required: true,
  },
  countries: {
    type: String,
    required: true,
  },
  beverages: {
    type: String,
    required: true,
  },
  coffeeCultures: {
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