// Airgas Gas Converter App
// Version: 1.0.2
// Last updated: 2025-04-23

console.log("Airgas Gas Converter App - Version 1.0.2");

let currentGas = "oxygen";
let inputMode = 'volume';

const volumeUnits = ["liters", "gallons", "cubic_meters", "standard_cubic_feet"];
const massUnits = ["kg", "pounds", "tons_metric", "tons_us"];

function updateGasProperties(gas) {
  const g = gases[gas];
  console.log("Gas properties updated:", g);
  document.getElementById("gasName").innerText = g.name;
  document.getElementById("boilingPoint").innerText = "Boiling Point: " + g.boiling;
  document.getElementById("enthalpy").innerText = "Enthalpy: " + g.enthalpy;
}

function updateModeUI() {
  const volumeBtn = document.getElementById("modeVolume");
  const massBtn = document.getElementById("modeMass");
  volumeBtn.classList.toggle("active", inputMode === "volume");
  massBtn.classList.toggle("active", inputMode === "mass");
  document.getElementById("volume").placeholder = inputMode === "volume" ? "Enter volume" : "Enter mass";
}

function updateToDropdown() {
  const toUnit = document.getElementById("toUnit");
  const toUnits = inputMode === 'volume' ? massUnits : volumeUnits;
  toUnit.innerHTML = toUnits.map(unit => `<option value="${unit}">${unitLabels[unit]}</option>`).join('');
}

function toggleInputMode(mode) {
  inputMode = mode;
  updateModeUI();
  updateToDropdown();

  const volumeInput = document.getElementById("volume");
  const resultBox = document.getElementById("result");
  if (volumeInput) volumeInput.value = "";
  if (resultBox) resultBox.innerText = "Result: —";
}

function convertGas() {
  const input = parseFloat(document.getElementById("volume").value);
  const toUnit = document.getElementById("toUnit").value;
  if (isNaN(input)) {
    document.getElementById("result").innerText = "Please enter a valid number.";
    return;
  }

  const gas = gases[currentGas];
  let convertedValue = 0;

  if (inputMode === 'volume') {
    const m3 = convertVolume(input, "liters", "cubic_meters");
    const kg = m3 * gas.density;
    convertedValue = convertVolume(kg, "kg", toUnit);
  } else {
    const kg = convertVolume(input, "kg", "kg");
    const m3 = kg / gas.density;
    convertedValue = convertVolume(m3, "cubic_meters", toUnit);
  }

  const label = unitLabels[toUnit] || toUnit;
  document.getElementById("result").innerText = `Result: ${convertedValue.toFixed(2)} ${label}`;
}

window.onload = () => {
  const volumeInput = document.getElementById("volume");
  const resultBox = document.getElementById("result");
  const cells = document.querySelectorAll(".pt-cell");

  cells.forEach(el => {
    const selectGas = () => {
      console.log("Gas selected:", el.dataset.gas);
      cells.forEach(c => c.classList.remove("active"));
      el.classList.add("active");
      currentGas = el.dataset.gas;
      updateGasProperties(currentGas);
      if (volumeInput) volumeInput.value = "";
      if (resultBox) resultBox.innerText = "Result: —";
    };
    el.addEventListener("click", selectGas);
    el.addEventListener("touchstart", selectGas);
  });

  updateModeUI();
  updateToDropdown();
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
