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
    description.innerHTML = response.data.weather[0].main;
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
    document
      .querySelector(".todayimage")
      .setAttribute(
        "src",
        "http://openweathermap.org/img/w/" +
          response.data.weather[0].icon +
          ".png"
      );
  });
  axios
    .get(
      `${root}/data/2.5/forecast?${queryParams}&appid=${apiKey}&units=metric`
    )
    .then(function (response) {
      console.log(response);
      // let dayone = response.data.list[1].dt_txt;
      // let dateone = document.querySelector(".dayonename");
      // dateone.innerHTML = generalDate(dayone);
      // console.log(dayone);
      let minDayOneTemp = Math.round(response.data.list[1].main.temp_min);
      let minOneTemp = document.querySelector(".dayonemintemp");
      minOneTemp.innerHTML = `${minDayOneTemp}°C`;
      let maxDayOneTemp = Math.round(response.data.list[1].main.temp_max);
      let maxOneTemp = document.querySelector(".dayonemaxtemp");
      maxOneTemp.innerHTML = `${maxDayOneTemp}°C`;
      document
        .querySelector(".dayoneimage")
        .setAttribute(
          "src",
          "http://openweathermap.org/img/w/" +
            response.data.list[1].weather[0].icon +
            ".png"
        );
      let minDayTwoTemp = Math.round(response.data.list[9].main.temp_min);
      let minTwoTemp = document.querySelector(".daytwomintemp");
      minTwoTemp.innerHTML = `${minDayTwoTemp}°C`;
      let maxDayTwoTemp = Math.round(response.data.list[8].main.temp_max);
      let maxTwoTemp = document.querySelector(".daytwomaxtemp");
      maxTwoTemp.innerHTML = `${maxDayTwoTemp}°C`;
      document
        .querySelector(".daytwoimage")
        .setAttribute(
          "src",
          "http://openweathermap.org/img/w/" +
            response.data.list[9].weather[0].icon +
            ".png"
        );
      let minDayThreeTemp = Math.round(response.data.list[17].main.temp_min);
      let minThreeTemp = document.querySelector(".daythreemintemp");
      minThreeTemp.innerHTML = `${minDayThreeTemp}°C`;
      let maxDayThreeTemp = Math.round(response.data.list[16].main.temp_max);
      let maxThreeTemp = document.querySelector(".daythreemaxtemp");
      maxThreeTemp.innerHTML = `${maxDayThreeTemp}°C`;
      document
        .querySelector(".daythreeimage")
        .setAttribute(
          "src",
          "http://openweathermap.org/img/w/" +
            response.data.list[17].weather[0].icon +
            ".png"
        );
      let minDayFourTemp = Math.round(response.data.list[25].main.temp_min);
      let minFourTemp = document.querySelector(".dayfourmintemp");
      minFourTemp.innerHTML = `${minDayFourTemp}°C`;
      let maxDayFourTemp = Math.round(response.data.list[24].main.temp_max);
      let maxFourTemp = document.querySelector(".dayfourmaxtemp");
      maxFourTemp.innerHTML = `${maxDayFourTemp}°C`;
      document
        .querySelector(".dayfourimage")
        .setAttribute(
          "src",
          "http://openweathermap.org/img/w/" +
            response.data.list[25].weather[0].icon +
            ".png"
        );
      let minDayFiveTemp = Math.round(response.data.list[33].main.temp_min);
      let minFiveTemp = document.querySelector(".dayfivemintemp");
      minFiveTemp.innerHTML = `${minDayFiveTemp}°C`;
      let maxDayFiveTemp = Math.round(response.data.list[32].main.temp_max);
      let maxFiveTemp = document.querySelector(".dayfivemaxtemp");
      maxFiveTemp.innerHTML = `${maxDayFiveTemp}°C`;
      document
        .querySelector(".dayfiveimage")
        .setAttribute(
          "src",
          "http://openweathermap.org/img/w/" +
            response.data.list[33].weather[0].icon +
            ".png"
        );
      let minDaySixTemp = Math.round(response.data.list[39].main.temp_min);
      let minSixTemp = document.querySelector(".daysixmintemp");
      minSixTemp.innerHTML = `${minDaySixTemp}°C`;
      let maxDaySixTemp = Math.round(response.data.list[38].main.temp_max);
      let maxSixTemp = document.querySelector(".daysixmaxtemp");
      maxSixTemp.innerHTML = `${maxDaySixTemp}°C`;
      document
        .querySelector(".daysiximage")
        .setAttribute(
          "src",
          "http://openweathermap.org/img/w/" +
            response.data.list[39].weather[0].icon +
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
