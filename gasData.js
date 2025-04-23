
// gasData.js

const gases = {
  oxygen: {
    name: "Oxygen",
    density: 1.429, // kg/m³ at STP
    boiling: "-183°C",
    enthalpy: "6.82 kJ/mol"
  },
  nitrogen: {
    name: "Nitrogen",
    density: 1.2506,
    boiling: "-196°C",
    enthalpy: "5.56 kJ/mol"
  },
  argon: {
    name: "Argon",
    density: 1.784,
    boiling: "-186°C",
    enthalpy: "6.43 kJ/mol"
  },
  carbon_dioxide: {
    name: "Carbon Dioxide",
    density: 1.977,
    boiling: "-78.5°C",
    enthalpy: "9.02 kJ/mol"
  },
  helium: {
    name: "Helium",
    density: 0.1786,
    boiling: "-269°C",
    enthalpy: "0.083 kJ/mol"
  },
  hydrogen: {
    name: "Hydrogen",
    density: 0.0899,
    boiling: "-253°C",
    enthalpy: "0.286 kJ/mol"
  },
  acetylene: {
    name: "Acetylene",
    density: 1.096,
    boiling: "-84°C",
    enthalpy: "1.27 kJ/mol"
  },
  propane: {
    name: "Propane",
    density: 2.0098,
    boiling: "-42°C",
    enthalpy: "1.04 kJ/mol"
  },
  propylene: {
    name: "Propylene",
    density: 1.859,
    boiling: "-47.6°C",
    enthalpy: "0.96 kJ/mol"
  }
};

if (typeof module !== "undefined") {
  module.exports = gases;
}
