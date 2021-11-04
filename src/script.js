let hour = document.querySelector(".currentHour");
let now = new Date();
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = "0" + currentHour;
}
let currentMin = now.getMinutes();
if (currentMin < 10) {
  currentMin = "0" + currentMin;
}
hour.innerHTML = `${currentHour}:${currentMin}`;

let date = document.querySelector(".currentday");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
date.innerHTML = currentDay;
let root = `https://api.openweathermap.org`;

function countrySubmit(event) {
  let inputCountry = document.querySelector("#search-submit");
  countryselected.innerHTML = inputCountry.value;
  showTemperature(`q=${inputCountry.value}`);
  event.preventDefault();
}
let countryselected = document.querySelector(".selectedcity");
let form = document.querySelector("#search-country");
form.addEventListener("submit", countrySubmit);

function showTemperature(queryParams) {
  let apiKey = "de05d2165a75b7d0ec3dd658f8e8549c";
  let apiUrl = `${root}/data/2.5/weather?&appid=${apiKey}&units=metric&${queryParams}`;
  axios.get(apiUrl).then(function (response) {
    console.log(response);
    let todayTemp = document.querySelector(".temp");
    todayTemp.innerHTML = Math.round(response.data.main.temp);
    let minCurrentTemp = Math.round(response.data.main.temp_min);
    let minTodatTemp = document.querySelector("#min-temp");
    minTodatTemp.innerHTML = `${minCurrentTemp}°C`;
    let maxCurrentTemp = Math.round(response.data.main.temp_max);
    let maxTodatTemp = document.querySelector("#max-temp");
    maxTodatTemp.innerHTML = `${maxCurrentTemp}°C`;
    let description = document.querySelector(".description");
    description.innerHTML = response.data.weather[0].description;
    let currentHumidity = response.data.main.humidity;
    let todayHumidity = document.querySelector(".humiditydata");
    todayHumidity.innerHTML = `${currentHumidity}%`;
    let currentSpeed = response.data.wind.speed;
    let todaySpeed = document.querySelector(".winddata");
    todaySpeed.innerHTML = `${currentSpeed}km/hr`;

    let unixSunrise = response.data.sys.sunrise;
    let sunrise = new Date(unixSunrise * 1000);
    let todaySunrise = document.querySelector(".sunrisedata");
    todaySunrise.innerHTML = moment(sunrise).format("LT");
    let unixSunset = response.data.sys.sunset;
    let sunset = new Date(unixSunset * 1000);
    let todaySunset = document.querySelector(".sunsetdata");
    todaySunset.innerHTML = moment(sunset).format("LT");
    let currentCountry = document.querySelector(".selectedcity");
    currentCountry.innerHTML = response.data.name;
    console.log(sunset);
    console.log(sunrise);
  });
}
// Current button function beggining
function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude);
  console.log(longitude);
  showTemperature(`lat=${latitude}&lon=${longitude}`);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let button = document.querySelector(".currentPlace");
button.addEventListener("click", getCurrentPosition); //Current button function ending

// function celsiusChange(event) {
//   event.preventDefault();
//   let celsTemp = document.querySelector(".temp");
//   celsTemp.innerHTML = "20";
// }
// let celsius = document.querySelector("#celsius-link");
// celsius.addEventListener("click", celsiusChange);

// function farenheitChange(event) {
//   event.preventDefault();
//   let farenhTemp = document.querySelector(".temp");
//   farenhTemp.innerHTML = "68";
// }
// let farenheit = document.querySelector("#farenheit-link");
// farenheit.addEventListener("click", farenheitChange);
