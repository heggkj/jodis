
let currentGas = "oxygen";
let inputMode = 'volume'; // volume or mass

function updateGasProperties(gas) {
  const g = gases[gas];
  console.log("Gas properties updated:", g);

  document.getElementById("gasName").innerText = g.name;
  document.getElementById("boilingPoint").innerText = "Boiling Point: " + g.boiling;
  document.getElementById("enthalpy").innerText = "Enthalpy: " + g.enthalpy;

  const v0 = document.getElementById("value0C");
  if (g.values && g.values.length > 0 && v0) {
    v0.innerText = "@0°C: " + g.values[0];
  } else if (v0) {
    v0.innerText = "@0°C: —";
  }
}

function updateVolumeLabel(unit) {
  const label = unitLabels[unit] || unit;
  console.log("Unit label updated:", label);
  document.getElementById("volumeUnitLabel").innerText = label;
}

function updateModeLabel() {
  const label = document.getElementById("volumeModeLabel");
  label.innerText = inputMode === 'volume' ? 'Volume' : 'Mass';
  document.getElementById("volume").placeholder = inputMode === 'volume' ? "Enter volume" : "Enter mass";
}

function toggleInputMode() {
  inputMode = inputMode === 'volume' ? 'mass' : 'volume';
  updateModeLabel();
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
    const m3 = input / 1000;
    const kg = m3 * gas.density;
    convertedValue = convertVolume(kg, "kg", toUnit);
  } else {
    const kg = convertVolume(input, toUnit, "kg");
    const m3 = kg / gas.density;
    const liters = m3 * 1000;
    convertedValue = convertVolume(liters, "liters", toUnit);
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

  document.getElementById("fromUnit").addEventListener("change", e => {
    updateVolumeLabel(e.target.value);
  });

  updateVolumeLabel(document.getElementById("fromUnit").value);
  updateGasProperties(currentGas);
  updateModeLabel();

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
