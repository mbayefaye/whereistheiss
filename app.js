const mymap = L.map("issMap").setView([0, 0], 1);

//leafjs
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

const issIcon = L.icon({
  iconUrl: "iss.png",
  iconSize: [50, 32],
  iconAnchor: [25, 26]
});

const marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);
let firstTime = true;

//getIss FUNCTION
async function getIss() {
  const url = "https://api.wheretheiss.at/v1/satellites/25544";
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  const { latitude, longitude, velocity } = data;
  marker.setLatLng([latitude, longitude]);
  if (firstTime) {
    mymap.setView([latitude, longitude], 2);
    firstTime = false;
  }
  document.getElementById("lat").textContent = latitude.toFixed(2);
  document.getElementById("lon").textContent = longitude.toFixed(2);
  document.getElementById("velo").textContent = velocity.toFixed(2);
}

getIss();

setInterval(getIss, 1000);
