// Global Variables
var APIKey = '950e5f6ee11a03024c303d695a0203f1';
var userSearch = localStorage.getItem('city-searches');
userSearch = JSON.parse(userSearch) || [];
var city = $('#city-name');
var weatherIcon = $('#weather-icon');
var temp = $('#temperature');
var humidity = $('#humidity');
var windSpeed = $('#wind-speed');
var UVIndex = $('#uv-index');

// AJAX call function
function renderWeather(cityName) {
  // 5 Day Forecast API URL
  var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&APPID=" + APIKey;

  // Current Westher API URL
  var weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&APPID=" + APIKey;

//main AJAX Call - for weather
  $.ajax({
    url: weatherQueryURL,
    method: 'GET'
  }).then(function(response){

    console.log(response);

    // Storing Latitude and Longitude as variables for UV Index AJAX Call
    var Lat = "lat=" + response.coord.lat;
    var Lon = "lon=" + response.coord.lon;

    // UV Index Query URL
    UVQUeryURL = "https://api.openweathermap.org/data/2.5/uvi?" + "&APPID=" + APIKey + "&" + Lat + "&" + Lon;

    // UV Index AJAX Call
    $.ajax({
      url: UVQUeryURL,
      method: 'GET'
    }).then(function(UVResponse){

      console.log(UVResponse);

      // Rendering UV Index from AJAX Call
      UVIndex.text('UV Index: ' + UVResponse.value);
    });

    // 5 Day Forecast AJAX Call
    $.ajax({
      url: forecastQueryURL,
      method: 'GET'
    }).then(function(forecastResponse){

      console.log(forecastResponse);

      // renderForecast(forecastResponse);
    });

    // emptying out text fields on every submit
    city.empty();
    temp.empty();
    humidity.empty();
    windSpeed.empty();

    // filling out text fields based on API Call Results
    city.text(response.name);
    temp.text("Temperature: " + response.main.temp + "℉");
    humidity.text("Humidity: " + response.main.humidity + "%");
    windSpeed.text("Wind Speed: " + response.wind.speed + "MPH");

  });


}

$('.btn-primary').click(function(event){
  event.preventDefault;

  // defining userInput for AJAX Call
  var userInput = $('#city-search').val().trim();

  // accounting for blank input field and invalid response
  if((userInput === null) || (userInput === '')){
    alert("Please enter a valid city");
  }

  // storing UserInput, pushing to array and adding to localStorage
  //running AJAX call function on submit
  else {
    userSearch.push(userInput);
    localStorage.setItem("city-searches", JSON.stringify(userSearch));
    renderWeather(userInput);
  }
});
