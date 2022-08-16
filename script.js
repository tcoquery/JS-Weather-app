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
    const city = document.getElementById("city");
    city.textContent = `${value}`;
    const d = document.getElementById("date");
    d.textContent = `${n}`;
    const t = document.getElementById("time");
    t.textContent = `${time}`;
    const temp = document.getElementById("temperature");
    temp.textContent = (response.main.temp - 273.15).toFixed(1) + " C°";
    const wind = document.getElementById("wind-speed");
    wind.textContent = "Wind Speed: " + response.wind.speed + "m/s";
    const humidity = document.getElementById("humidity");
    humidity.textContent = "Humidity: " + response.main.humidity + "%";
  });
}

fetchData(`http://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=c1cf9e616011473ffae77b02ee775686`);


