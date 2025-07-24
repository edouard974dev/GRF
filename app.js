let data;
fetch('data.json')
  .then(res => res.json())
  .then(json => {
    data = json["EMB-135"]["CAT I - Flap 22 - No Ice - With Thrust Reverser"]["RWYCC"];
    const select = document.getElementById('rwycc');
    Object.keys(data).forEach(key => {
      const opt = document.createElement('option');
      opt.value = key;
      opt.innerText = `RWYCC ${key}`;
      select.appendChild(opt);
    });
  });

function calculate() {
  const rwycc = document.getElementById('rwycc').value;
  const d = data[rwycc];
  let distance = d.ref;
  distance -= ((18000 - Number(weight.value)) / 1000) * d.deltaWeight;
  distance += (Number(altitude.value) / 1000) * d.deltaAlt;
  distance -= (Number(temp.value) / 5) * d.deltaTemp;
  distance -= (Number(wind.value) / 5) * d.deltaWind;
  distance += Number(slope.value) * d.deltaSlope;
  distance += (Number(vap.value) / 5) * d.deltaVap;
  resultat.innerText = `Distance estimée : ${Math.round(distance)} m`;
}
