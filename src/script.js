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

// FORECAST
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row forecast-row">`;

  let days = ["Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="col-3" id="forecast">
            <div class="card" style="width: 150px">
              <div class="card-body">
                <h5 class="card-title" id="forecast-day">Tomorrow</h5>
                <p class="card-text">
                  <span class="forecast-temp min"> 20° /</span>
                  <span class="forecast-temp-max"> 50°C </span>
                </p>
                <div id="forecast-icon"><img src="" alt="forecast-icon" /></div>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item forecast-condition">Sunny</li>
                <li class="list-group-item forecast-humidity">many %</li>
                <li class="list-group-item forecast-wind-speed">many km/h</li>
              </ul>
            </div>
          </div>
        `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
displayForecast();

/* Forecast Plan
1) Build the structure (html and css for the forecast)

2) add api call for forecast data

3) replace fake with real data
*/
