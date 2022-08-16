const date = new Date();
const n = date.toDateString();
const time = date.toLocaleTimeString();

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

let value = params.query; 

function fetchData(data) {
  fetch(data)
  .then(function(response) {
     return response.json();
  })
  .then(function(response) {
    cityInformation()
    const temp = document.getElementById("temperature");
    temp.textContent = (response.main.temp - 273.15).toFixed(1) + " C°";
    const wind = document.getElementById("wind-speed");
    const windIcon = document.createElement("i");
    const windSpeed = document.createElement("span");
    windIcon.className = "fa-solid fa-wind";
    windSpeed.textContent = " " + response.wind.speed + "m/s";
    wind.append(windIcon, windSpeed);
    const humidity = document.getElementById("humidity");
    const humidIcon = document.createElement("i");
    const humidPercentage = document.createElement("span");
    humidIcon.className = "fa-solid fa-droplet";
    humidPercentage.textContent =  " " + response.main.humidity + "%";
    humidity.append(humidIcon, humidPercentage);
    const sunrise = document.getElementById("sunrise");
    sunrise.textContent = "Sunrise: " + getSunTime(response.sys.sunrise);
    const sunset = document.getElementById("sunset");
    sunset.textContent = "Sunset: " + getSunTime(response.sys.sunset);

  });
}

function cityInformation() {
  const city = document.getElementById("city");
  city.textContent = `${value}`;
  const d = document.getElementById("date");
  d.textContent = `${n}`;
  const t = document.getElementById("time");
  t.textContent = `${time}`;
}

function getSunTime(data) {
  const sunrise = new Date(data * 1000);
  const hours = sunrise.getHours();
// Minutes part from the timestamp
  const minutes = "0" + sunrise.getMinutes();
  const formattedTime = hours + ':' + minutes.substr(-2);
  return formattedTime;
}

fetchData(`http://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=c1cf9e616011473ffae77b02ee775686`);


