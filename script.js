var timezone, humidity, pressure, temperature, windSpeed, summary, weatherSummery, object;

var element = function (id) {
    return document.getElementById(id);
};

window.onload = function () {
    timezone = element('timezone');
    humidity = element('current-humidity');
    pressure = element('current-pressure');
    temperature = element('current-temperature');
    windSpeed = element('current-wind-speed');
    summary = element('current-summary');
    weatherSummery = element('weather-summary');
};


function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            showWeather(lat, long);
        });
    } else {
        return window.alert("Could not get location");
    }
}


function showWeather(lat, long) {
    var url = `https://api.darksky.net/forecast/5f89f908e2cd28e1a5c887a5c507247d/${lat},${long}` + `?units=si&lang=ru&format=jsonp&callback=displayWeather`;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}


function displayWeather(object) {

  console.log(object)

    timezone.innerHTML = 'Timezone: ' + object.timezone;
    humidity.innerHTML = 'Humidity: ' + humidityPercentage(object.currently.humidity) + '%';
    pressure.innerHTML = 'Pressure: ' + object.currently.pressure + 'mb';
    temperature.innerHTML = 'Temperature: ' + object.currently.temperature + 'C';
    windSpeed.innerHTML = 'Wind Speed: ' + object.currently.windSpeed + 'km/h';
    summary.innerHTML = 'Summary: ' + object.currently.summary;
    weatherSummery.innerHTML = '' + object.hourly.summary;  
    document.getElementById('weather-summary').style.backgroundColor = "darkblue";
    document.getElementById('timezone').style.backgroundColor = "darkblue";
}


function humidityPercentage(k) {
    return Math.round(k * 100);
}



