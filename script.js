// Airgas Gas Converter App
// Version: 1.0.3
// Last updated: 2025-04-23

console.log("Airgas Gas Converter App - Version 1.0.3");

let currentGas = "oxygen";
let inputMode = "volume";

const volumeUnits = ["liters", "gallons", "cubic_meters", "standard_cubic_feet"];
const massUnits = ["kg", "pounds", "tons_metric", "tons_us"];
const unitLabels = {
  liters: "Liters",
  gallons: "Gallons",
  cubic_meters: "Cubic Meters",
  standard_cubic_feet: "SCF",
  kg: "Kilograms",
  pounds: "Pounds",
  tons_metric: "Tons (Metric)",
  tons_us: "Tons (US)"
};

function updateGasProperties(gas) {
  const g = gases[gas];
  document.getElementById("gasName").innerText = g.name;
  document.getElementById("boilingPoint").innerText = "Boiling Point: " + g.boiling;
  document.getElementById("enthalpy").innerText = "Enthalpy: " + g.enthalpy;
}

function updateLabels() {
  const x = inputMode === "volume" ? "Volume" : "Mass";
  const y = inputMode === "volume" ? "Mass" : "Volume";
  document.getElementById("fromLabel").innerText = `From (${x}):`;
  document.getElementById("toLabel").innerText = `To (${y}):`;
}

function updateDropdowns() {
  const fromUnit = document.getElementById("fromUnit");
  const toUnit = document.getElementById("toUnit");

  const fromOptions = (inputMode === "volume" ? volumeUnits : massUnits)
    .map(u => `<option value="${u}">${unitLabels[u]}</option>`).join('');
  const toOptions = (inputMode === "volume" ? massUnits : volumeUnits)
    .map(u => `<option value="${u}">${unitLabels[u]}</option>`).join('');

  fromUnit.innerHTML = fromOptions;
  toUnit.innerHTML = toOptions;
}

function toggleInputMode(mode) {
  inputMode = mode;
  updateLabels();
  updateDropdowns();
  document.getElementById("volume").value = "";
  document.getElementById("result").innerText = "Result: —";
}

function convertGas() {
  const input = parseFloat(document.getElementById("volume").value);
  const fromUnit = document.getElementById("fromUnit").value;
  const toUnit = document.getElementById("toUnit").value;
  if (isNaN(input)) {
    document.getElementById("result").innerText = "Please enter a valid number.";
    return;
  }

  const gas = gases[currentGas];
  let convertedValue = 0;

  if (inputMode === 'volume') {
    const m3 = convertVolume(input, fromUnit, "cubic_meters");
    const kg = m3 * gas.density;
    convertedValue = convertVolume(kg, "kg", toUnit);
  } else {
    const kg = convertVolume(input, fromUnit, "kg");
    const m3 = kg / gas.density;
    convertedValue = convertVolume(m3, "cubic_meters", toUnit);
  }

  document.getElementById("result").innerText = `Result: ${convertedValue.toFixed(2)} ${unitLabels[toUnit]}`;
}

window.onload = () => {
  const volumeInput = document.getElementById("volume");
  const resultBox = document.getElementById("result");
  const cells = document.querySelectorAll(".pt-cell");

  cells.forEach(el => {
    const selectGas = () => {
      cells.forEach(c => c.classList.remove("active"));
      el.classList.add("active");
      currentGas = el.dataset.gas;
      updateGasProperties(currentGas);
      volumeInput.value = "";
      resultBox.innerText = "Result: —";
    };
    el.addEventListener("click", selectGas);
    el.addEventListener("touchstart", selectGas);
  });

  updateLabels();
  updateDropdowns();
  updateGasProperties(currentGas);

  const tips = [
    "Secure cylinders properly.",
    "Ventilate the vehicle when transporting gas.",
    "Use gloves and eye protection.",
    "Never smoke near gas cylinders.",
    "Check valves for leaks before use.",
    "Label and separate fuel vs oxidizer gases.",
    "Keep cylinders upright and chained.",
    "Inspect hoses for cracks and wear.",
    "Use correct pressure regulators.",
    "Store tanks in cool, ventilated areas."
  ];
  const tipBox = document.getElementById("safetyTip");
  if (tipBox) {
    tipBox.innerText = tips[Math.floor(Math.random() * tips.length)];
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }
};
