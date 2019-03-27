

    function getWeather (cityName){
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=766db9013b296138aa05335799e4d729&units=metric`) //units=metric zapewnia temperaturę w stopniach celsjusza - defaultowo temperatura jest w kelvinach
            .then(response => response.json())
            .then(data => {
                
                weather.name = data.city.name; // name fetching
                weather.temperature = data.list[0].main.temp; //temperature fetching
                weather.descr = `${data.list[0].weather[0].main}, ${data.list[0].weather[0].description}`;
                weather.humidity = `${data.list[0].main.humidity}%`;
                weather.pressure = `${data.list[0].main.pressure}hPa`;
                weather.icon = data.list[0].weather[0].icon;
                weather.windSpeed = `${data.list[0].wind.speed}km/h`
                return data;
            })
            .catch(error => console.error(error))
    }

    let weather = {}

    let newY = getWeather('new york');


//Response from API about blocking
// {
//     "cod": 429,
//         "message": "Your account is temporary blocked due to exceeding of requests limitation of your subscription type. 
//     Please choose the proper subscription http://openweathermap.org/price"
// }