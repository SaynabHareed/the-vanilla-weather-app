function formatDate(timestamp) {
  let date = new Date(timestamp);
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
  return `${day} ${hours} : ${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = "row">`;
  let days = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `

              <div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAZ9JREFUaN7tmdGNgzAMhhmBERiBEVjgJEbICIyQERiBTS4j5JU3RmCDnHNyq1wE1A4Jl0iJ9KtqVdv/R+xA1cYY05Ssos1XgCwBOGtd1x4kPfVNwhUFAI1rkDmRTgVyGwCMiQvjvkRWAGBoYJh/qc8JQAcAqCwAsO9NoBbQ5n1m38+g9ikAeQPgSjtofAJgTgTw0lg6wE5ppyAAmxj72CTWHB0Ae39/wPzvYEcDwKuuHzL+VkyAx81HA0h4ZKYHwNbZ/wvg4KFQcAFEJub/3Mk5ADJDgPcRWzKAVVc6wFQ6gKQA9EUD4H1AFdtCN3465jHEua8KUCzA1/c6gBbQxikI35cgZV8ZMae1ggAgUWuTgQxqIBqZnBhFjLmsFQognYRWI9HI7sRoxo6d1mIDQILOS0i9kosXNxBiPtYKAVBe0o7Yw27MQoT+WIsFYLfPSyiJRrQTY9uoJcSQapEBDoZpIxqZPCNTwOCe1uIAZDO4oQBbwOAK7uBya3EAFs7gHpwipMHl1uIADLi1XcNYGCOYMeRa9W/WClABKkAFiKofRnoGaQBkK9wAAAAASUVORK5CYII="
                  width="42px"
                  alt=""
                />

                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max"> 18°</span>
                  <span class="weather-forecast-temperature-mini"> 12°</span>
                </div>
              </div>
           
  
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "f81614abe2395d5dfecd45b9298041de";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}`;
  console.log(apiUrl);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.degree;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);

  celsiusTemperature = response.data.temperature.current;
  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  iconElement.setAttribute("alt", response.data.condition.description);
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "6875a2tbd2fbb2b16oab443ef3f004a3c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  console.log(celsiusTemperature);
}

let celsiusTemperature = null;

displayForecast();

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

search("London");
