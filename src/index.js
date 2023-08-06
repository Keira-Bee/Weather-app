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

function searchedCity(city) {
  let units = "metric";
  let apiKey = "667d9f573c8af4c33457be5d561a9148";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function showWeatherCondition(response) {
  document.querySelector("#searched-city").innerHTML = response.data.name;
  document.querySelector("#searched-city-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".weather-conditions").innerHTML =
    response.data.weather[0].description;
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
  let apiKey = "667d9f573c8af4c33457be5d561a9148";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let form = document.querySelector("form");
form.addEventListener("submit", changeCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchedCity("Paris");

// function celsiusConvert(event) {
//   event.preventDefault();
//   let currentTemperature = document.querySelector("#current-temperature");
//   currentTemperature.innerHTML = 19;
// }

// function fahrenheitConvert(event) {
//   event.preventDefault();
//   let currentTemperature = document.querySelector("#current-temperature");
//   currentTemperature.innerHTML = 66;
// }

// let cTemperature = document.querySelector("#c-temperature");
// cTemperature.addEventListener("click", celsiusConvert);

// let fTemperature = document.querySelector("#f-temperature");
// fTemperature.addEventListener("click", fahrenheitConvert);
