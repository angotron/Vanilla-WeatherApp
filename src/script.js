function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#searched-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}
let apiKey = "8050aaa898a67ab7de90e5b1200fb4e2";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${apiKey}`;
axios.get(apiUrl).then(displayTemperature);

function displayIcon(response) {
  let iconElement = document.querySelector("#main-icon");
  iconElement.innerHTML = response.data.weather[0].icon;
}
let apiIconUrl = `http://openweathermap.org/img/wn/10d@2x.png`;
axios.get(apiIconUrl).then(displayIcon);
/* 

*/
