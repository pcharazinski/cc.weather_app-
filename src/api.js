

    const linkDoJSON =
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json";

    let miasta = [];

    fetch(linkDoJSON)
        .then(blob => blob.json())
        .then(dane => miasta = dane)

    const szukanaFraza = document.querySelector('.wyszukiwarka')
    const podpowiedzi = document.querySelector('.podpowiedzi')
    const submit = document.querySelector('.submit')

    function dopasuj(co, arr) {
        return arr.filter(miasto => {
            const reg = new RegExp(co, 'gi')
            return miasto.name.match(reg)
        })
    }

    function wyswietlDopasowanie() {
        const wynikiPasujace = dopasuj(this.value, miasta)
        const paskiPodpowiedzi = wynikiPasujace.map(miasto => {
            return `<li><span>${miasto.name}<span></li>`
        }).join('')
        podpowiedzi.innerHTML = paskiPodpowiedzi
    }

    szukanaFraza.addEventListener('keyup', wyswietlDopasowanie)

    podpowiedzi.addEventListener('click', e => {
        if (e.target) {
            szukanaFraza.value = e.target.innerText
            podpowiedzi.innerHTML = "<ul></ul>"
        }
    })

    submit.addEventListener('click', e => {
        getWeather(szukanaFraza.value)
        console.log(weather)
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

    let weather = {}

//Response from API about blocking
// {
//     "cod": 429,
//         "message": "Your account is temporary blocked due to exceeding of requests limitation of your subscription type. 
//     Please choose the proper subscription http://openweathermap.org/price"
// }