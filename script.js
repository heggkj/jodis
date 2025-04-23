
// script.js

let currentGas = "oxygen";

function updateGasProperties(gas) {
  const g = gases[gas];
  console.log("Gas properties updated:", g);

  document.getElementById("gasName").innerText = g.name;
  document.getElementById("boilingPoint").innerText = "Boiling Point: " + g.boiling;
  document.getElementById("enthalpy").innerText = "Enthalpy: " + g.enthalpy;
}

function updateVolumeLabel(unit) {
  const label = unitLabels[unit] || unit;
  console.log("Unit label updated:", label);
  document.getElementById("volumeUnitLabel").innerText = label;
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
  let convertedValue;

  if (["kg", "tons_metric", "tons_us", "pounds"].includes(fromUnit) ||
      ["kg", "tons_metric", "tons_us", "pounds"].includes(toUnit)) {
    const volumeInM3 = convertVolume(input, fromUnit, "cubic_meters");
    const weightKg = volumeInM3 * gas.density;
    convertedValue = convertVolume(weightKg, "kg", toUnit);
  } else {
    convertedValue = convertVolume(input, fromUnit, toUnit);
  }

  const label = unitLabels[toUnit] || toUnit;
  const resultText = `Result: ${convertedValue.toFixed(2)} ${label}`;
  document.getElementById("result").innerText = resultText;
  console.log("Conversion result:", resultText);
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

      if (volumeInput) {
        volumeInput.value = "";
        console.log("Volume input cleared");
      }
      if (resultBox) {
        resultBox.innerText = "Result: —";
        console.log("Result text reset");
      }
    };

    el.addEventListener("click", selectGas);
    el.addEventListener("touchstart", selectGas);
  });

  document.getElementById("fromUnit").addEventListener("change", e => {
    updateVolumeLabel(e.target.value);
  });

  updateVolumeLabel(document.getElementById("fromUnit").value);
  updateGasProperties(currentGas);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }
};

  document.getElementById("fromUnit").addEventListener("change", e => {
    updateVolumeLabel(e.target.value);
  });

  updateVolumeLabel(document.getElementById("fromUnit").value);
  updateGasProperties(currentGas);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }

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
};
