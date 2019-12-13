// Global Variables
var APIKey = '950e5f6ee11a03024c303d695a0203f1';
var userSearch = localStorage.getItem('city-searches');
userSearch = JSON.parse(userSearch) || [];
var userSearch = $('#city-search').val().trim();

function renderWeather(cityName) {
  var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&APPID=" + APIKey;
  var weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&APPID=" + APIKey;
}
