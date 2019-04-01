
    let weather = {};
    let citiesList = [];

    const jsonLink =
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json";
    
    const apiID = '766db9013b296138aa05335799e4d729';
    const units = 'metric';
    const lang = 'pl';

    const phrase = document.querySelector('.search');
    const hints = document.querySelector('.hints');
    const submit = document.querySelector('.submit');
    

    fetch(jsonLink)
        .then(blob => blob.json())
        .then(data => citiesList = data.map(e => {
            return e.name;
        }))

    

    function fit(what, arr) {
        return arr.filter(e => {
            const reg = new RegExp(what, 'gi')
            return e.match(reg)
        })
    }

    function showProposition() {
        const searchResults = fit(this.value, citiesList)
        const addHint = searchResults.map(e => {
            return `<li><span>${e}<span></li>`
        }).join('')
        hints.innerHTML = addHint
    }

    // phrase.addEventListener('keyup', function(){
    //     setTimeout(showProposition, 2000)
    // })
    phrase.addEventListener('keyup', showProposition)

    hints.addEventListener('click', e => {
        if (e.target) {
            phrase.value = e.target.innerText
            hints.innerHTML = "<ul></ul>"
        }
    })

    function getWeather(cityName) {
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=${apiID}&units=${units}&lang=${lang}`) //units=metric zapewnia temperaturę w stopniach celsjusza - defaultowo temperatura jest w kelvinach
            .then(response => response.json())
            .then(data => {
                console.log(data);
                weather.name = data.city.name; // name fetching
                weather.temperature = `${data.list[0].main.temp}°C`; //temperature fetching
                weather.descr = data.list[0].weather[0].description; //descriptions concatenation
                weather.humidity = `${data.list[0].main.humidity}%`; // humidity fetching
                weather.pressure = `${data.list[0].main.pressure}hPa`; //pressure fetching
                weather.icon = data.list[0].weather[0].icon; // icon id string
                weather.windSpeed = `${data.list[0].wind.speed}km/h` //wind speed fetching
            })
            .catch(error => console.error(error))
    }
    
      function logToDocument() {
          return document.querySelector('.results').innerHTML = "<img src='http://openweathermap.org/img/w/"+weather.icon+".png'>"+`${weather.name}, ${weather.temperature}, ${weather.descr}, ${weather.humidity}, ${weather.pressure}, ${weather.icon}, ${weather.windSpeed}`;
      }



    submit.addEventListener('click', e => {
        getWeather(phrase.value)
        if (weather.name = phrase.value) {
            console.log(weather)
            logToDocument();
        }
    })
//Response from API about blocking
// {
//     "cod": 429,
//         "message": "Your account is temporary blocked due to exceeding of requests limitation of your subscription type. 
//     Please choose the proper subscription http://openweathermap.org/price"
// }