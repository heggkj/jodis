// conversion.js (refactored for extensibility)

const volumeUnits = {
  liters: { label: "Liters", toLiters: 1 },
  gallons: { label: "Gallons", toLiters: 3.78541 },
  standard_cubic_feet: { label: "SCF", toLiters: 28.3168 },
  cubic_meters: { label: "Cubic Meters", toLiters: 1000 }
};

const massUnits = {
  kg: { label: "Kilograms", toKg: 1 },
  pounds: { label: "Pounds", toKg: 0.453592 },
  tons_metric: { label: "Tons (Metric)", toKg: 1000 },
  tons_us: { label: "Tons (US)", toKg: 907.18474 }
};

const allUnits = {
  ...Object.fromEntries(Object.entries(volumeUnits).map(([k, v]) => [k, { ...v, type: "volume" }])),
  ...Object.fromEntries(Object.entries(massUnits).map(([k, v]) => [k, { ...v, type: "mass" }]))
};

// General-purpose conversion
function convertVolume(inputValue, fromUnit, toUnit) {
  if (fromUnit === toUnit) return inputValue;

  const from = allUnits[fromUnit];
  const to = allUnits[toUnit];
  if (!from || !to) throw new Error("Unknown unit");

  const base = from.toLiters || from.toKg;
  const target = to.toLiters || to.toKg;

  const valueInBase = inputValue * base;
  return valueInBase / target;
}

if (typeof module !== "undefined") {
  module.exports = { convertVolume, volumeUnits, massUnits, allUnits };
}
