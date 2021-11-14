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
let currentTime = `${currentHour}:${currentMin}`;
hour.innerHTML = currentTime;

function generalDay(dayNumber) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[dayNumber];
}

function generalDate(date) {
  let day = generalDay(date.getDay());
  return day;
}

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
    let date = document.querySelector(".currentday");
    date.innerHTML = generalDate(new Date());
    let todayTemp = document.querySelector(".temp");
    todayTemp.innerHTML = Math.round(response.data.main.temp);
    let minCurrentTemp = Math.floor(response.data.main.temp_min);
    let minTodatTemp = document.querySelector("#min-temp");
    minTodatTemp.innerHTML = `${minCurrentTemp}°C`;
    let maxCurrentTemp = Math.round(response.data.main.temp_max);
    let maxTodatTemp = document.querySelector("#max-temp");
    maxTodatTemp.innerHTML = `${maxCurrentTemp}°C`;
    let description = document.querySelector(".description");
    let todayDescription = response.data.weather[0].main;
    description.innerHTML = todayDescription;
    let currentHumidity = response.data.main.humidity;
    let todayHumidity = document.querySelector(".humiditydata");
    todayHumidity.innerHTML = `${currentHumidity}%`;
    let currentSpeed = response.data.wind.speed;
    let todaySpeed = document.querySelector(".winddata");
    todaySpeed.innerHTML = `${currentSpeed}km/hr`;
    // Sunrise & Sunset call
    let sunriseTime = new Date(response.data.sys.sunrise * 1000);
    let sunriseHour = sunriseTime.getHours();
    if (sunriseHour < 10) {
      sunriseHour = "0" + sunriseHour;
    }
    let sunriseMin = sunriseTime.getMinutes();
    if (sunriseMin < 10) {
      sunriseMin = "0" + sunriseMin;
    }
    let todaySunrise = document.querySelector(".sunrisedata");
    todaySunrise.innerHTML = `${sunriseHour}:${sunriseMin}`;

    let sunsetTime = new Date(response.data.sys.sunset * 1000);
    let sunsetHour = sunsetTime.getHours();
    if (sunsetHour < 10) {
      sunsetHour = "0" + sunsetHour;
    }
    let sunsetMin = sunsetTime.getMinutes();
    if (sunsetMin < 10) {
      sunsetMin = "0" + sunsetMin;
    }
    let todaySunset = document.querySelector(".sunsetdata");
    todaySunset.innerHTML = `${sunsetHour}:${sunsetMin}`;
    // Location Call
    let currentCountry = document.querySelector(".selectedcity");
    currentCountry.innerHTML = response.data.name;
    //Icon call
    document
      .querySelector(".todayimage")
      .setAttribute(
        "src",
        "http://openweathermap.org/img/w/" +
          response.data.weather[0].icon +
          ".png"
      );
    //Background & Message change
    // if (todayDescription == "Clear") {
    //   document.body.style.backgroundImage = "url(`images/clear2.jpg`)";
    //  } else if (todayDescription == "Clouds") {
    //    document.body.style.backgroundImage = "url(`images/Cloudy.jpg`)";
    //  } else if (todayDescription == "Rain") {
    //    document.body.style.backgroundImage = "url(`images/Rain.jpg`)";
    //  } else if (todayDescription == "Mist") {
    //    document.body.style.backgroundImage = "url(`images/Mist.jpg`)";
    //  } else {
    //    document.body.style.backgroundImage = "url(`images/clear2.jpg`)";
    //  }
    getForecast(response.data.coord);
  });
}

function getForecast(coords) {
  let apiKey = "de05d2165a75b7d0ec3dd658f8e8549c";
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
  axios.get(forecastApiUrl).then(function (response) {
    console.log(response);
    let minDayOneTemp = Math.round(response.data.daily[1].temp.min);
    let minOneTemp = document.querySelector(".dayonemintemp");
    minOneTemp.innerHTML = `${minDayOneTemp}°C`;
    let maxDayOneTemp = Math.round(response.data.daily[1].temp.max);
    let maxOneTemp = document.querySelector(".dayonemaxtemp");
    maxOneTemp.innerHTML = `${maxDayOneTemp}°C`;
    let forecastDayOne = new Date(response.data.daily[1].dt * 1000);
    console.log(forecastDayOne);
    document.querySelector(".day_onename").innerHTML =
      generalDate(forecastDayOne);
    document
      .querySelector(".dayoneimage")
      .setAttribute(
        "src",
        "http://openweathermap.org/img/w/" +
          response.data.daily[1].weather[0].icon +
          ".png"
      );
    let minDayTwoTemp = Math.round(response.data.daily[2].temp.min);
    let minTwoTemp = document.querySelector(".daytwomintemp");
    minTwoTemp.innerHTML = `${minDayTwoTemp}°C`;
    let maxDayTwoTemp = Math.round(response.data.daily[2].temp.max);
    let maxTwoTemp = document.querySelector(".daytwomaxtemp");
    maxTwoTemp.innerHTML = `${maxDayTwoTemp}°C`;
    let forecastDayTwo = new Date(response.data.daily[2].dt * 1000);
    console.log(forecastDayTwo);
    document.querySelector(".day_twoname").innerHTML =
      generalDate(forecastDayTwo);
    document
      .querySelector(".daytwoimage")
      .setAttribute(
        "src",
        "http://openweathermap.org/img/w/" +
          response.data.daily[2].weather[0].icon +
          ".png"
      );
    let minDayThreeTemp = Math.round(response.data.daily[3].temp.min);
    let minThreeTemp = document.querySelector(".daythreemintemp");
    minThreeTemp.innerHTML = `${minDayThreeTemp}°C`;
    let maxDayThreeTemp = Math.round(response.data.daily[3].temp.max);
    let maxThreeTemp = document.querySelector(".daythreemaxtemp");
    maxThreeTemp.innerHTML = `${maxDayThreeTemp}°C`;
    let forecastDayThree = new Date(response.data.daily[3].dt * 1000);
    console.log(forecastDayThree);
    document.querySelector(".day_threename").innerHTML =
      generalDate(forecastDayThree);
    document
      .querySelector(".daythreeimage")
      .setAttribute(
        "src",
        "http://openweathermap.org/img/w/" +
          response.data.daily[3].weather[0].icon +
          ".png"
      );
    let minDayFourTemp = Math.round(response.data.daily[4].temp.min);
    let minFourTemp = document.querySelector(".dayfourmintemp");
    minFourTemp.innerHTML = `${minDayFourTemp}°C`;
    let maxDayFourTemp = Math.round(response.data.daily[4].temp.max);
    let maxFourTemp = document.querySelector(".dayfourmaxtemp");
    maxFourTemp.innerHTML = `${maxDayFourTemp}°C`;
    let forecastDayFour = new Date(response.data.daily[4].dt * 1000);
    console.log(forecastDayFour);
    document.querySelector(".day_fourname").innerHTML =
      generalDate(forecastDayFour);
    document
      .querySelector(".dayfourimage")
      .setAttribute(
        "src",
        "http://openweathermap.org/img/w/" +
          response.data.daily[4].weather[0].icon +
          ".png"
      );
    let minDayFiveTemp = Math.round(response.data.daily[5].temp.min);
    let minFiveTemp = document.querySelector(".dayfivemintemp");
    minFiveTemp.innerHTML = `${minDayFiveTemp}°C`;
    let maxDayFiveTemp = Math.round(response.data.daily[5].temp.max);
    let maxFiveTemp = document.querySelector(".dayfivemaxtemp");
    maxFiveTemp.innerHTML = `${maxDayFiveTemp}°C`;
    let forecastDayFive = new Date(response.data.daily[5].dt * 1000);
    console.log(forecastDayFive);
    document.querySelector(".day_fivename").innerHTML =
      generalDate(forecastDayFive);
    document
      .querySelector(".dayfiveimage")
      .setAttribute(
        "src",
        "http://openweathermap.org/img/w/" +
          response.data.daily[5].weather[0].icon +
          ".png"
      );
    let minDaySixTemp = Math.round(response.data.daily[6].temp.min);
    let minSixTemp = document.querySelector(".daysixmintemp");
    minSixTemp.innerHTML = `${minDaySixTemp}°C`;
    let maxDaySixTemp = Math.round(response.data.daily[6].temp.max);
    let maxSixTemp = document.querySelector(".daysixmaxtemp");
    maxSixTemp.innerHTML = `${maxDaySixTemp}°C`;
    let forecastDaySix = new Date(response.data.daily[6].dt * 1000);
    console.log(forecastDaySix);
    document.querySelector(".day_sixname").innerHTML =
      generalDate(forecastDaySix);
    document
      .querySelector(".daysiximage")
      .setAttribute(
        "src",
        "http://openweathermap.org/img/w/" +
          response.data.daily[6].weather[0].icon +
          ".png"
      );
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

showTemperature("q=Mexico City");

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
