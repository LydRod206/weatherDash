const apiKey = "b9fe50f1bc06f17cccf57381fc2658d8";
const searchForm = document.querySelector("form");
const cityInput = document.querySelector("#city-input");
const currentWeatherSection = document.querySelector("#current-weather");
const fiveDayForecastSection = document.querySelector("#five-day-forecast");
let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Update current weather section with data
      displayCurrentWeather(data);
    })
    .catch((error) => console.error(error));

  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      // Update five day forecast section with data
      displayFiveDayForecast(data);
    })
    .catch((error) => console.error(error));
}

function displayCurrentWeather(data) {
  // Clear previous content
  currentWeatherSection.innerHTML = "";

  // Extract relevant data from the API response
  const cityName = data.name;
  const date = new Date(data.dt * 1000).toLocaleDateString();
  const iconCode = data.weather[0].icon;
  const temperature = data.main.temp;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  // Create HTML elements to display the current weather
  const cityHeading = document.createElement("h2");
  cityHeading.textContent = cityName;

  const dateParagraph = document.createElement("p");
  dateParagraph.textContent = date;

  const iconImage = document.createElement("img");
  iconImage.src = `http://openweathermap.org/img/wn/${iconCode}.png`;

  const temperatureParagraph = document.createElement("p");
  temperatureParagraph.textContent = `Temperature: ${temperature}°C`;

  const humidityParagraph = document.createElement("p");
  humidityParagraph.textContent = `Humidity: ${humidity}%`;

  const windSpeedParagraph = document.createElement("p");
  windSpeedParagraph.textContent = `Wind Speed: ${windSpeed} m/s`;

  // Append the elements to the current weather section
  currentWeatherSection.appendChild(cityHeading);
  currentWeatherSection.appendChild(dateParagraph);
  currentWeatherSection.appendChild(iconImage);
  currentWeatherSection.appendChild(temperatureParagraph);
  currentWeatherSection.appendChild(humidityParagraph);
  currentWeatherSection.appendChild(windSpeedParagraph);
}

function displayFiveDayForecast(data) {
  // Clear previous content
  fiveDayForecastSection.innerHTML = "";

  // Extract relevant data from the API response
  const forecastItems = data.list;

  // Loop through the forecast items and create HTML elements for each day
  for (let i = 0; i < forecastItems.length; i += 8) {
    const forecastItem = forecastItems[i];

    const date = new Date(forecastItem.dt * 1000).toLocaleDateString();
    const iconCode = forecastItem.weather[0].icon;
    const temperature = forecastItem.main.temp;
    const humidity = forecastItem.main.humidity;
    const windSpeed = forecastItem.wind.speed;

    // Create HTML elements for the forecast item
    const forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast-card");

    const dateHeading = document.createElement("h3");
    dateHeading.textContent = date;

    const iconImage = document.createElement("img");
    iconImage.src = `http://openweathermap.org/img/wn/${iconCode}.png`;

    const temperatureParagraph = document.createElement("p");
    temperatureParagraph.textContent = `Temperature: ${temperature}°C`;

    const humidityParagraph = document.createElement("p");
    humidityParagraph.textContent = `Humidity: ${humidity}%`;

    const windSpeedParagraph = document.createElement("p");
    windSpeedParagraph.textContent = `Wind Speed: ${windSpeed} m/s`;

    // Append the elements to the forecast card
    forecastCard.appendChild(dateHeading);
    forecastCard.appendChild(iconImage);
    forecastCard.appendChild(temperatureParagraph);
    forecastCard.appendChild(humidityParagraph);
    forecastCard.appendChild(windSpeedParagraph);

    // Append the forecast card to the five day forecast section
    fiveDayForecastSection.appendChild(forecastCard);
  }
}

function handleSearch(event) {
  event.preventDefault();
  const city = cityInput.value.trim();
  getWeatherData(city);
  searchHistory.push(city);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  cityInput.value = "";
}

// List of cities
const cities = [
  "Seattle",
  "New York",
  "Los Angeles",
  "San Francisco",
  "Miami",
  "Chicago",
  "Toronto",
  "London",
  "Paris",
  "Rio de Janeiro",
  "Mexico City"
];

// Loop through the list of cities and add event listeners to the search buttons
const cityButtons = document.querySelectorAll(".city-choice");
cityButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const city = button.textContent;
    getWeatherData(city);
    searchHistory.push(city);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  });
});
searchForm.addEventListener("submit", handleSearch);