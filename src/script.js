function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#searched-city");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
}
let apiKey = "8050aaa898a67ab7de90e5b1200fb4e2";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${apiKey}`;
axios.get(apiUrl).then(displayTemperature);

/* <li id="precipitation">Precipitation</li>
              <li id="humidity">Humidity</li>
              <li id="wind">Wind</li>
            </ul>


id="searched-city"



id="current-temp"


            */
