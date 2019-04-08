
    let weather = {};
    let citiesList = [];

    const jsonLink =
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json";
    
    const apiID = '766db9013b296138aa05335799e4d729';
    const units = 'metric';
    const lang = 'pl';

    const phrase = document.querySelector('.search');
    const hints = document.querySelector('.hints');
    const submit = document.querySelector('#submit');
    
    fetch('./src/current.city.list.min.json')
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
        let phraseLength = phrase.value.length
        if (phraseLength >= 3){
            const searchResults = fit(this.value, citiesList)
            searchResults.slice(0,11)
            const addHint = searchResults.map(e => {
                return `<li><span>${e}<span></li>`
            }).join('')
            hints.innerHTML = addHint
        } 
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

    function getWeather(cityName, callback) {
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=${apiID}&units=${units}&lang=${lang}`) //units=metric zapewnia temperaturę w stopniach celsjusza - defaultowo temperatura jest w kelvinach
            .then(response => response.json())
            .then(data => {
                console.log(data);
                weather.name = data.city.name; // name fetching
                weather.temperature = `${Math.round(data.list[0].main.temp)}°C`; //temperature fetching
                weather.descr = data.list[0].weather[0].description; //descriptions concatenation
                weather.humidity = `${data.list[0].main.humidity}%`; // humidity fetching
                weather.pressure = `${Math.round(data.list[0].main.pressure)}hPa`; //pressure fetching
                weather.icon = data.list[0].weather[0].icon; // icon id string
                weather.windSpeed = `${data.list[0].wind.speed}km/h` //wind speed fetching
                callback({weather})
            })
            .catch(error => console.error(error))
    }

    function logToDocument() {
        hints.innerHTML="";
        return document.querySelector('.results').innerHTML = "<img src='http://openweathermap.org/img/w/"+weather.icon+".png'>"+`${weather.name}, ${weather.temperature}, ${weather.descr}, ${weather.humidity}, ${weather.pressure}, ${weather.windSpeed}`;
    }

    submit.addEventListener('click', e => {
        if(citiesList.includes(`${phrase.value}`)) {
        getWeather(phrase.value, (data) => logToDocument()(data))
        } else {
            alert("Podaj poprawną nazwę miasta!")
        }
    })
//Response from API about blocking
// {
//     "cod": 429,
//         "message": "Your account is temporary blocked due to exceeding of requests limitation of your subscription type. 
//     Please choose the proper subscription http://openweathermap.org/price"
// }

$(document).ready(function() {
    //Autocomplete
    $(function() {
      $.ajax({
        type: 'GET',
        url: 'https://restcountries.eu/rest/v2/all?fields=name',
        success: function(response) {
          var countryArray = response;
          var dataCountry = {};
          for (var i = 0; i < countryArray.length; i++) {
            //console.log(countryArray[i].name);
            dataCountry[countryArray[i].name] = countryArray[i].flag; //countryArray[i].flag or null
          }
          $('input.autocomplete').autocomplete({
            data: dataCountry,
            limit: 10, // The max amount of results that can be shown at once. Default: Infinity.
            minLength: 2
          });
        }
      });
    });
  });
