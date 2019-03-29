

    const jsonLink =
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json";

    let citiesList = [];

    fetch(jsonLink)
        .then(blob => blob.json())
        .then(data => citiesList = data.map(e => {
            return e.name;
        }))

    const phrase = document.querySelector('.search')
    const hints = document.querySelector('.hints')
    const submit = document.querySelector('.submit')

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

    phrase.addEventListener('keyup', showProposition)

    hints.addEventListener('click', e => {
        if (e.target) {
            phrase.value = e.target.innerText
            hints.innerHTML = "<ul></ul>"
        }
    })

    submit.addEventListener('click', e => {
        console.log(phrase.value)
        getWeather(phrase.value)
        console.log(weather)
        console.log(phrase.value)
        logToDocument();
    })


    function getWeather(cityName) {
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=766db9013b296138aa05335799e4d729&units=metric`) //units=metric zapewnia temperaturę w stopniach celsjusza - defaultowo temperatura jest w kelvinach
            .then(response => response.json())
            .then(data => {

                weather.name = data.city.name; // name fetching
                weather.temperature = data.list[0].main.temp; //temperature fetching
                weather.descr = `${data.list[0].weather[0].main}, ${data.list[0].weather[0].description}`; //descriptions concatenation
                weather.humidity = `${data.list[0].main.humidity}%`; // humidity fetching
                weather.pressure = `${data.list[0].main.pressure}hPa`; //pressure fetching
                weather.icon = data.list[0].weather[0].icon; // icon id string
                weather.windSpeed = `${data.list[0].wind.speed}km/h` //wind speed fetching
            })
            .catch(error => console.error(error))
    }

      function logToDocument() {
          return document.querySelector('.results').innerHTML = `${weather.name}, ${weather.temperature}, ${weather.descr}, ${weather.humidity}, ${weather.pressure}, ${weather.icon}, ${weather.windSpeed}`;
      }

    let weather = {}

//Response from API about blocking
// {
//     "cod": 429,
//         "message": "Your account is temporary blocked due to exceeding of requests limitation of your subscription type. 
//     Please choose the proper subscription http://openweathermap.org/price"
// }