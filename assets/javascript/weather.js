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
    })
    .catch((error) => console.error(error));

  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      // Update five day forecast section with data
    })
    .catch((error) => console.error(error));
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

// Loop through the list of cities and add event listeners to the search button
cities.forEach((city) => {
  const searchBtn = document.querySelector(`#${city.toLowerCase()}-search-btn`);
  searchBtn.addEventListener("click", () => {
    getWeatherData(city);
    searchHistory.push(city);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  });
});

searchForm.addEventListener("submit", handleSearch);
