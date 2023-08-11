// function formatDate(date) {
//   let hours = date.getHours();
//   if (hours < 10) {
//     hours = `0${hours}`;
//   }
//   let minutes = date.getMinutes();
//   if (minutes < 10) {
//     minutes = `0${minutes}`;
//   }
//   let days = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   let day = days[date.getDay()];

//   return `${day} ${hours}:${minutes}`;
// }

// let currentDay = document.querySelector("#current-day");
// let currentTime = new Date();
// currentDay.innerHTML = formatDate(currentTime);

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

  return `${day} ${hours}:${minutes}`;
}

function searchedCity(city) {
  let units = "metric";
  let apiKey = "b2d392316cfa1a65t53d71a032b444co";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function showWeatherCondition(response) {
  celsiusTemperature = response.data.temperature.current;

  document.querySelector("#searched-city").innerHTML = response.data.city;
  document.querySelector("#searched-city-temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.temperature.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.condition.description;
  document.querySelector("#current-day").innerHTML = formatDate(
    response.data.time * 1000
  );
  document
    .querySelector("#current-weather-icon")
    .setAttribute("src", response.data.condition.icon_url);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  searchedCity(city);
}

function showCurrentPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "b2d392316cfa1a65t53d71a032b444co";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

function celsiusConvert(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let currentTemperature = document.querySelector("#searched-city-temperature");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}

function convertFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let currentTemperature = document.querySelector("#searched-city-temperature");
  currentTemperature.innerHTML = fahrenheitTemperature;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", celsiusConvert);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertFahrenheit);

let celsiusTemperature = null;

let form = document.querySelector("form");
form.addEventListener("submit", changeCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchedCity("Perth");
