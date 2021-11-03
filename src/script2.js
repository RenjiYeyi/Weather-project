let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  sanFransisco: {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};

function cityMessage() {
  let citySelected = prompt("Enter a city.");
  citySelected = citySelected.toLowerCase().trim();
  if (citySelected === "paris") {
    alert(
      `It is currently ${Math.floor(weather.paris.temp)}°C (${Math.floor(
        (weather.paris.temp * 9) / 5 + 32
      )}°F) in Paris with a humidity of ${weather.paris.humidity}%`
    );
  } else {
    if (citySelected === "tokyo") {
      alert(
        `It is currently ${Math.floor(weather.tokyo.temp)}°C (${Math.floor(
          (weather.tokyo.temp * 9) / 5 + 32
        )}°F) in Tokyo with a humidity of ${weather.tokyo.humidity}%`
      );
    } else {
      if (citySelected === "lisbon") {
        alert(
          `It is currently ${Math.floor(weather.lisbon.temp)}°C (${Math.floor(
            (weather.lisbon.temp * 9) / 5 + 32
          )}°F) in Lisbon with a humidity of ${weather.lisbon.humidity}%`
        );
      } else {
        if (citySelected === "san fransisco") {
          alert(
            `It is currently ${Math.floor(
              weather.sanFransisco.temp
            )}°C (${Math.floor(
              (weather.sanFransisco.temp * 9) / 5 + 32
            )}°F) in San Fransisco with a humidity of ${
              weather.sanFransisco.humidity
            }%`
          );
        } else {
          if (citySelected === "moscow") {
            alert(
              `It is currently ${Math.floor(
                weather.moscow.temp
              )}°C (${Math.floor(
                (weather.moscow.temp * 9) / 5 + 32
              )}°F) in Moscow with a humidity of ${weather.moscow.humidity}%`
            );
          } else {
            alert(
              `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${citySelected}`
            );
          }
        }
      }
    }
  }
}
cityMessage();
