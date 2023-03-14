async function getWeather(location, unit) {
  // Unit: Metric > Celsius, Imperial > Fahrenheit
  const coordinates_response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=e63db9ba1c63a5d6bcd0884dbd1ded12`,
    { mode: "cors" }
  );
  const coordinates = await coordinates_response.json();
  const coordinates_lat = coordinates[0].lat;
  const coordinates_lon = coordinates[0].lon;
  const country_response = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${coordinates_lat}&lon=${coordinates_lon}&appid=e63db9ba1c63a5d6bcd0884dbd1ded12&units=${unit}`,
    { mode: "cors" }
  );
  const country = await country_response.json();
  console.log(country);

  // Weather data
  const weahter_data = {
    city: country.city.name,
    country: country.city.country,
    day_0: {
      temp: country.list[0].main.temp,
      temp_max: country.list[0].main.temp_max,
      temp_min: country.list[0].main.temp_min,
      main: country.list[0].weather[0].main,
    },
    day_1: {
      temp: country.list[1].main.temp,
      temp_max: country.list[1].main.temp_max,
      temp_min: country.list[1].main.temp_min,
      main: country.list[1].weather[0].main,
    },
    day_2: {
      temp: country.list[2].main.temp,
      temp_max: country.list[2].main.temp_max,
      temp_min: country.list[2].main.temp_min,
      main: country.list[2].weather[0].main,
    },
    day_3: {
      temp: country.list[3].main.temp,
      temp_max: country.list[3].main.temp_max,
      temp_min: country.list[3].main.temp_min,
      main: country.list[3].weather[0].main,
    },
  };

  console.log(weahter_data);
  return weahter_data;
}

function updateWeatherData() {
  const search_button = document.querySelector(".search_button");
  const search_input = document.querySelector(".search_input");
  const unit_button = document.querySelector(".unit_button");
  const error_output = document.querySelector(".error_output");
  const country_name = document.querySelector(".country_name");

  unit_button.addEventListener("click", () => {
    if (unit_button.innerHTML == "Celsius") {
      unit_button.innerHTML = "Fahrenheit";
    } else {
      unit_button.innerHTML = "Celsius";
    }
  });

  search_button.addEventListener("click", async () => {
    try {
      // Check which unit
      const unit = unit_button.innerHTML == "Celsius" ? "metric" : "imperial";

      // Reset error
      error_output.innerHTML = "";

      const weahter_data = await getWeather(search_input.value, unit);

      // Display country name
      country_name.innerHTML = `${weahter_data.city}, ${weahter_data.country}`;

      // Display weather data
      for (let i = 0; i < 4; i++) {
        const unit_symbol = unit == "metric" ? "C" : "F";
        const weahter_main_box = document.querySelector(".weather_main_box");
        const day_x_img = document.querySelector(`.day_${i}_img`);
        const day_x_temp = document.querySelector(`.day_${i}_temp`);
        const day_x_min_temp = document.querySelector(`.day_${i}_min_temp`);
        const day_x_max_temp = document.querySelector(`.day_${i}_max_temp`);

        day_x_img.src = `./img/${weahter_data[`day_${i}`].main}.png`;
        day_x_temp.innerHTML = `Cur: ${
          weahter_data[`day_${i}`].temp
        } ${unit_symbol} `;
        day_x_min_temp.innerHTML = `Min: ${
          weahter_data[`day_${i}`].temp_min
        } ${unit_symbol} `;
        day_x_max_temp.innerHTML = `Max: ${
          weahter_data[`day_${i}`].temp_max
        } ${unit_symbol} `;

        // Make visible
        weahter_main_box.classList.remove("invisible");
      }
    } catch (error) {
      console.log(error);
      error_output.innerHTML = "City not found. Please type a valid city";
    }
  });
}
updateWeatherData();
