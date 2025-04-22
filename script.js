
const tips = [
  "Secure cylinders properly.",
  "Ventilate vehicle with gases.",
  "Use PPE and check valves."
];

const gases = {
  oxygen: { name: "Oxygen", density: 0.082, boiling: "-183°C", enthalpy: "6.82 kJ/mol", values: [1.0, 1.02, 1.03] },
  nitrogen: { name: "Nitrogen", density: 0.072, boiling: "-196°C", enthalpy: "5.56 kJ/mol", values: [1.0, 1.01, 1.02] },
  argon: { name: "Argon", density: 0.103, boiling: "-186°C", enthalpy: "6.43 kJ/mol", values: [1.0, 1.01, 1.02] },
  carbon_dioxide: { name: "Carbon Dioxide", density: 0.114, boiling: "-78.5°C", enthalpy: "9.02 kJ/mol", values: [1.0, 1.01, 1.02] },
  helium: { name: "Helium", density: 0.011, boiling: "-269°C", enthalpy: "0.083 kJ/mol", values: [1.0, 1.01, 1.02] },
  hydrogen: { name: "Hydrogen", density: 0.005, boiling: "-253°C", enthalpy: "0.286 kJ/mol", values: [1.0, 1.01, 1.02] },
  acetylene: { name: "Acetylene", density: 0.071, boiling: "-84°C", enthalpy: "1.27 kJ/mol", values: [1.0, 1.01, 1.02] },
  propane: { name: "Propane", density: 0.116, boiling: "-42°C", enthalpy: "1.04 kJ/mol", values: [1.0, 1.01, 1.02] },
  propylene: { name: "Propylene", density: 0.108, boiling: "-47.6°C", enthalpy: "0.96 kJ/mol", values: [1.0, 1.01, 1.02] }
};

let currentGas = "oxygen";

function updateGasProperties(gas) {
  const g = gases[gas];
  document.getElementById("gasName").innerText = g.name;
  document.getElementById("boilingPoint").innerText = "Boiling Point: " + g.boiling;
  document.getElementById("enthalpy").innerText = "Enthalpy: " + g.enthalpy;
  document.getElementById("value0C").innerText = "@0°C: " + g.values[0];
  document.getElementById("value15C").innerText = "@15°C: " + g.values[1];
  document.getElementById("value20C").innerText = "@20°C: " + g.values[2];
}

function convertGas() {
  const vol = parseFloat(document.getElementById("volume").value);
  if (isNaN(vol)) {
    document.getElementById("result").innerText = "Please enter a valid volume.";
    return;
  }
  const result = gases[currentGas].density * vol;
  document.getElementById("result").innerText = `Result: ${result.toFixed(2)} lb`;
}

window.onload = () => {
  const volumeInput = document.getElementById("volume");
  const resultBox = document.getElementById("result");
  const cells = document.querySelectorAll(".pt-cell");

  cells.forEach(el => {
    el.addEventListener("click", () => {
      console.log("Gas selected:", el.dataset.gas);
      cells.forEach(c => c.classList.remove("active"));
      el.classList.add("active");

      currentGas = el.dataset.gas;
      updateGasProperties(currentGas);

      // Clear volume and result explicitly
      if (volumeInput) {
        volumeInput.value = "";
        console.log("Volume input cleared");
      }

      if (resultBox) {
        resultBox.innerText = "Result: —";
        console.log("Result text reset");
      }
    });
  });

  const tipBox = document.getElementById("safetyTip");
  if (tipBox) {
    tipBox.innerText = tips[Math.floor(Math.random() * tips.length)];
  }

  updateGasProperties(currentGas);
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }
};
