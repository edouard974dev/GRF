let data;

fetch('data.json')
  .then(res => res.json())
  .then(json => {
    data = json;
    const aircraftSelect = document.getElementById('aircraft');
    Object.keys(data).forEach(ac => {
      const opt = document.createElement('option');
      opt.value = ac;
      opt.innerText = ac;
      aircraftSelect.appendChild(opt);
    });
    aircraftSelect.onchange = updateConfigs;
    document.getElementById('configuration').onchange = updateRWYCC;
    updateConfigs();
  });

function updateConfigs() {
  const ac = document.getElementById('aircraft').value;
  const configSelect = document.getElementById('configuration');
  configSelect.innerHTML = '';
  Object.keys(data[ac]).forEach(cfg => {
    const opt = document.createElement('option');
    opt.value = cfg;
    opt.innerText = cfg;
    configSelect.appendChild(opt);
  });
  updateRWYCC();
}

function updateRWYCC() {
  const ac = document.getElementById('aircraft').value;
  const cfg = document.getElementById('configuration').value;
  const rwyccSelect = document.getElementById('rwycc');
  rwyccSelect.innerHTML = '';
  Object.keys(data[ac][cfg].RWYCC).forEach(r => {
    const opt = document.createElement('option');
    opt.value = r;
    opt.innerText = r;
    rwyccSelect.appendChild(opt);
  });
}

function calculate() {
  const ac = document.getElementById('aircraft').value;
  const cfg = document.getElementById('configuration').value;
  const rwycc = document.getElementById('rwycc').value;
  const d = data[ac][cfg].RWYCC[rwycc];
  let distance = d.ref;
  distance -= ((18000 - Number(weight.value)) / 1000) * d.deltaWeight;
  distance += (Number(altitude.value) / 1000) * d.deltaAlt;
  distance -= (Number(temp.value) / 5) * d.deltaTemp;
  distance -= (Number(wind.value) / 5) * d.deltaWind;
  distance += Number(slope.value) * d.deltaSlope;
  distance += (Number(vap.value) / 5) * d.deltaVap;
  document.getElementById('resultat').innerText = `Distance estimée : ${Math.round(distance)} m`;
}
