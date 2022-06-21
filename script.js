

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
    const temp = document.getElementById("temperature");
    temp.textContent = "Temperature: " + (response.main.temp - 273.15).toFixed(1) + " C°";
  });
}

fetchData(`http://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=c1cf9e616011473ffae77b02ee775686`);


