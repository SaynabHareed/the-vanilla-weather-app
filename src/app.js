function displayTemperature(response) {
  console.log(response.data);

  let degreeElement = document.querySelector("#degree");
  degreeElement.innerHTML = Math.round(response.data.temperature.current);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.degree;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = response.data.time;
}
let apiKey = "875a2tbd2fbb2b16oab443ef3f004a3c";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=London&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
