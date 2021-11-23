// FUNCTIONS

function formatDate(timezone) {
  let myDate = new Date();
  let localTime = myDate.getTime();
  let localOffset = myDate.getTimezoneOffset() * 60000;
  let utc = localTime + localOffset;
  let date = new Date(utc + 1000 * timezone);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}
function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
function getForecast(coordinates) {
  let apiKey = "8050aaa898a67ab7de90e5b1200fb4e2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#searched-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#main-icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.timezone);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "8050aaa898a67ab7de90e5b1200fb4e2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-bar");
  searchCity(cityInputElement.value);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#current-temp");

  let fahrenheitTemp = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = fahrenheitTemp;
}
function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

// FORECAST
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row forecast-row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6 && index > 0) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-3" id="forecast">
    <div class="card" style="width: 175px">
    <div class="card-body">
    <h5 class="card-title" id="forecast-day">${formatForecastDay(
      forecastDay.dt
    )}</h5>

   

    <p class="card-text">
    <span class="forecast-temp min"> ${Math.round(
      forecastDay.temp.min
    )}° /</span>
    <span class="forecast-temp-max">  ${Math.round(
      forecastDay.temp.max
    )}° <strong> C </strong> </span>
    </p>
    <div id="forecast-icon"><img src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" 
    alt="forecast-icon" /></div>
    </div>
    <ul class="list-group list-group-flush">
    <li class="list-group-item forecast-condition">  🔮  ${
      forecastDay.weather[0].description
    }</li>
    <li class="list-group-item forecast-humidity">🤿   ${
      forecastDay.humidity
    }%</li>
    <li class="list-group-item forecast-wind-speed">🌬  ${Math.round(
      forecastDay.wind_speed
    )}
     km/h</li>
    </ul>
    </div>
    </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(response.data.daily);
}

// VARIABLES

let celsiusTemperature = null;

let form = document.querySelector("#search-form");

let fahrenheitLink = document.querySelector("#fahrenheit-link");

let celsiusLink = document.querySelector("#celsius-link");

// CALLS

form.addEventListener("submit", handleSubmit);
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);
celsiusLink.addEventListener("click", displayCelsiusTemp);
searchCity("New York");
