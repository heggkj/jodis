
// conversion.js

// Supported units and their base conversion to liters (or base gas density unit)
const unitConversions = {
  "liters": 1,
  "gallons": 3.78541,
  "kg": 1, // depends on gas density, handled separately
  "tons_metric": 1000,
  "tons_us": 907.18474,
  "pounds": 0.453592,
  "standard_cubic_feet": 28.3168,
  "cubic_meters": 1000
};

// Conversion logic
function convertVolume(inputValue, fromUnit, toUnit) {
  if (fromUnit === toUnit) return inputValue;

  const liters = inputValue * unitConversions[fromUnit];
  return liters / unitConversions[toUnit];
}

// Human-readable labels
const unitLabels = {
  "liters": "liters",
  "gallons": "gallons",
  "kg": "kilograms",
  "tons_metric": "metric tons",
  "tons_us": "US tons",
  "pounds": "pounds",
  "standard_cubic_feet": "scf",
  "cubic_meters": "m³"
};

if (typeof module !== "undefined") {
  module.exports = { convertVolume, unitLabels };
}
