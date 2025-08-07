async function calculate() {
  const rwycc = document.getElementById("rwycc").value;
  const weight = parseFloat(document.getElementById("weight").value);
  const altitude = parseFloat(document.getElementById("altitude").value);
  const temperature = parseFloat(document.getElementById("temperature").value);
  const wind = parseFloat(document.getElementById("wind").value); // positive = headwind
  const vap = parseFloat(document.getElementById("vap").value);

  const response = await fetch("data.json");
  const data = await response.json();

  const entry = data[rwycc];
  if (!entry) {
    document.getElementById("result").innerText = "Données RWYCC non disponibles.";
    return;
  }

  let distance = entry.ref;

  // Weight correction
  const weightDiff = weight - 18000;
  if (weightDiff !== 0) {
    distance += (weightDiff > 0)
      ? (weightDiff / 1000) * entry.weight.above
      : (weightDiff / 1000) * entry.weight.below;
  }

  // Altitude correction
  const altCorrection = (altitude / 1000) * entry.alt.above; // always positive
  distance += altCorrection;

  // Temperature correction (ISA deviation)
  const tempCorrection = (temperature / 5) * (
    temperature > 0 ? entry.temp.above : entry.temp.below
  );
  distance += tempCorrection;

  // Wind correction (headwind positive)
  const windCorrection = (wind / 5) * (
    wind > 0 ? entry.wind.head : entry.wind.tail
  );
  distance += windCorrection;

  // VAP correction (VREF+)
  const vapCorrection = (vap / 5) * entry.vap;
  distance += vapCorrection;

  document.getElementById("result").innerText = "Distance estimée : " + Math.round(distance) + " m";
}

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
