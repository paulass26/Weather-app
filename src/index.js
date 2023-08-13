function renderFormattedDate(formattedDate) {
  let h2 = document.querySelector("h2");
  h2.innerHTML = formattedDate;
}

function formatDate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
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
  let currentDay = days[date.getDay()];
  let currentTime = date.toLocaleTimeString("COT");
  let formattedDate = currentDay + " " + currentTime;
  renderFormattedDate(formattedDate);
  return formattedDate;
}

console.log(formatDate(new Date()));
//challenge 5//
let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
function showTemperature(response) {
  console.log(response.data);
  let temperatureElement = Math.round(response.data.main.temp);
  console.log(temperatureElement);
  let city = response.data.name;
  let message = ` ${temperatureElement} `;
  let sing = `${city}`;
  let div = document.querySelector("#temperature ");
  div.innerHTML = message;
  let h1 = document.querySelector("#city");
  h1.innerHTML = sing;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let speedElement = document.querySelector("#wind");
  speedElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
}
{
  let units = "metric";
  let city = "#city";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function Position(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemperature);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", Position);

navigator.geolocation.getCurrentPosition(Position);

//search function City//

function citySearch(event) {
  event.preventDefault();
  let whichCity = document.querySelector("#city-search-input");
  let heading = document.querySelector("#city");
  heading.innerHTML = whichCity.value;

  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${whichCity.value}&units=${units}&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", citySearch);
function getCurrentCityTemperature(currentCResponse) {
  let cTemperature = Math.round(currentCResponse.data.main.temp);
  let ccity = currentCResponse.data.name;

  let cCTemperatureElement = document.querySelector("#temperature");
  let cCityElement = document.querySelector("#city");

  cCTemperatureElement.innerHTML = cTemperature;
  cCityElement.innerHTML = ccity;
}
console.log(getCurrentCityTemperature);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheiLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheiLink = document.querySelector("#fahrenheit-link");
fahrenheiLink.addEventListener("click", displayFahrenheitTemperature);
