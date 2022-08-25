const date = new Date();
const n = date.toDateString();
const time = date.toLocaleTimeString();
const temp = document.getElementById("temperature");
const desc = document.getElementById("description");
const wind = document.getElementById("wind-speed");
const humidity = document.getElementById("humidity");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

let value = params.query; 
console.log(value)

function fetchData(data) {
  fetch(data)
  .then(function(response) {
     return response.json();
  })
  .then(function(response) {
    cityInformation(response.cod)
    getBackground(response.weather[0].main);
    temp.textContent = (response.main.temp - 273.15).toFixed(1) + " C°";
    desc.textContent = capitalizeFirstLetter(response.weather[0].description);
    const windIcon = document.createElement("i");
    const windSpeed = document.createElement("span");
    windIcon.className = "fa-solid fa-wind";
    windSpeed.textContent = " " + response.wind.speed + "m/s";
    wind.append(windIcon, windSpeed);
    const humidIcon = document.createElement("i");
    const humidPercentage = document.createElement("span");
    humidIcon.className = "fa-solid fa-droplet";
    humidPercentage.textContent =  " " + response.main.humidity + "%";
    humidity.append(humidIcon, humidPercentage);
    sunrise.textContent = "Sunrise: " + getSunTime(response.sys.sunrise, response.timezone);
    sunset.textContent = "Sunset: " + getSunTime(response.sys.sunset, response.timezone);
  });
}

function cityInformation(data) {
  const card = document.getElementById("card");
  const city = document.getElementById("city");
  const d = document.getElementById("date");
  const t = document.getElementById("time");
  if (value != "") {
    card.style.display = "block";
  }
  if (data == "404") {
    city.textContent = "Could not find this city";
  } else {
    city.textContent = `${value}`;
    d.textContent = `${n}`;
    t.textContent = `${time}`;
  }
}

function getBackground(data) {
  const card = document.getElementById("card");
  switch (data) {
    case "Clouds":
      card.style.backgroundImage = "url('./img/clouds.jpg')";
      break;
    case "Thunderstorm":
      card.style.backgroundImage = "url('./img/thunderstorm.jpg')";
      card.style.color = "white";
      break;
    case "Drizzle":
      card.style.backgroundImage = "url('./img/drizzle.jpg')";
      break;
    case "Rain":
      card.style.backgroundImage = "url('./img/rain.jpg')";
      break
    case "Snow":
      card.style.backgroundImage = "url('./img/snow.jpg')";
      break;
    case "Clear":
      card.style.backgroundImage = "url('./img/sunny.jpg')";
      break;
    default:
      return;
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getSunTime(time, timezone) {
  const sunrise = new Date((time + timezone) * 1000);
  const hours = sunrise.getUTCHours();
  const minutes = "0" + sunrise.getUTCMinutes();
  const formattedTime = hours + ':' + minutes.substr(-2);
  return formattedTime;
}

if (value != null) {
  fetchData(`https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=c1cf9e616011473ffae77b02ee775686`);
}



