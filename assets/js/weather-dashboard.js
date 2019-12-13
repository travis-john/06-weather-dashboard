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

function renderWeather(cityName) {
  var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&APPID=" + APIKey;
  var weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&APPID=" + APIKey;

  $.ajax({
    url: weatherQueryURL,
    method: 'GET'
  }).then(function(response){
    // console.log(response);
    var Lat = "lat=" + response.coord.lat;
    var Lon = "lon=" + response.coord.lon;
    UVQUeryURL = "https://api.openweathermap.org/data/2.5/uvi?" + "&APPID=" + APIKey + "&" + Lat + "&" + Lon;
    // var currentWeatherIcon = response.list[3].weather[0].icon
    // console.log(response);

    $.ajax({
      url: UVQUeryURL,
      method: 'GET'
    }).then(function(UVResponse){
      // console.log(UVResponse);
      UVIndex.text('UV Index: ' + UVResponse.value);
    });

    city.empty();
    temp.empty();
    humidity.empty();
    windSpeed.empty();


    city.text(response.name);
    // weatherIcon.attr('src', "https://openweathermap.org/img/wn/" + currentWeatherIcon + "@2x.png" )
    temp.text("Temperature: " + response.main.temp + "℉");
    humidity.text("Humidity: " + response.main.humidity + "%");
    windSpeed.text("Wind Speed: " + response.wind.speed + "MPH");

  });
}

$('.btn-primary').click(function(event){
  event.preventDefault;
  var userInput = $('#city-search').val().trim();
  if((userInput === null) || (userInput === '')){
    alert("Please enter a valid city");
  } else {
    userSearch.push(userInput);
    localStorage.setItem("city-searches", JSON.stringify(userSearch));
    renderWeather(userInput);
    // userInput.empty();
  }



});
