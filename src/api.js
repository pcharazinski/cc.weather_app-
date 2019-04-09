
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

    var map2 
    var currentCityName
    

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
        let phraseLength = phrase.value.length
        if (phraseLength >= 3){
            const searchResults = fit(this.value, citiesList)
            
            const addHint = searchResults.slice(0,8).map(e => {
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
                weather.id = data.list[0].weather[0].id; 
                callback({ weather })    
                 
            })
            .catch(error => console.error(error))
    }

    
    function logToDocument() {
        
        hints.innerHTML="";
        console.log(weather.id)
                return document.querySelector('.results').innerHTML = `${weather.name}, ${weather.temperature}, ${weather.descr}, ${weather.humidity}, ${weather.pressure}, ${weather.windSpeed}, ${weather.id}`+ "<img src='http://openweathermap.org/img/w/"+weather.icon+".png'>";
                
        
    }

    submit.addEventListener('click', e => {
        if(citiesList.includes(`${phrase.value}`)) {
        getWeather(phrase.value, (data) => logToDocument()(data))
        background();
        currentCityName=phrase.value

    } else {
            alert("Podaj poprawną nazwę miasta!")
        }
    })

    miejsce.addEventListener('click', e =>{
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': currentCityName}, function (results, status) {
            if (status === 'OK') {
                map2.setCenter(results[0].geometry.location);
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
        document.getElementById('map2').style.display = "block";
        
    });
//Response from API about blocking
// {
//     "cod": 429,
//         "message": "Your account is temporary blocked due to exceeding of requests limitation of your subscription type. 
//     Please choose the proper subscription http://openweathermap.org/price"
// }



//autolokalizacja
$(document).ready(function () {
    var geo = navigator.geolocation;
    if (geo) {

        $('#detect').on('click', function () {

            geo.getCurrentPosition(function (location) {
                // zapisanie szerokości i długości geograficznej do zmiennych
                var lat = location.coords.latitude;
                var lng = location.coords.longitude;

                // opcje mapy
                var mapOptions = {
                    // wielkość zoomu
                    zoom: 15,
                    // współrzędne punktu, na którym wyśrodkowana jest mapa
                    center: new google.maps.LatLng(lat, lng),
                };

                // pobranie mapy do zmiennej
                var mapElement = document.getElementById('map');

                // Utworzenie mapy Google używając elementu #map i opcji zdefiniowanych w tablicy
                var map = new google.maps.Map(mapElement, mapOptions);

                // dodanie znacznika
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lng),
                    map: map,
                    title: 'Mapa Devcorner'
                });

            });

        });

    } else {
        console.log('niedostępny');
    }

});

function initAutocomplete() {
    map2 = new google.maps.Map(document.getElementById('map2'), {
        center: { lat: 51.107883, lng: 17.038538 }, //współrzędne Wrocławia
        zoom: 13,
        mapTypeId: 'roadmap'
    });
    document.getElementById('map2').style.display = "none";

}
function background(){
var i=Math.floor(Math.random() * 12);


var backgroundVideo = document.getElementById('bg_src');
var icon = document.getElementsByClassName('icon');
console.log(weather.icon[0])
if (weather.id == 800) {
    backgroundVideo.setAttribute('src', 'https://static.videezy.com/system/resources/previews/000/007/024/original/timelapse_clouds.mp4');
    icon[0].src = 'img/sunrise.svg';

} else if (weather.id == 500 || 501 || 511 || 520 || 300 ||301 || 302 || 310 ||311 || 312||313|| 314||321 || 502|| 503 || 504|| 521|| 522|| 531) {
    backgroundVideo.setAttribute('src', 'https://static.videezy.com/system/resources/previews/000/002/396/original/raindrops-on-a-window.mp4');
    icon[0].src = 'img/raining.svg';
} else if (weather.id == 600|| 601|| 602|| 611|| 612|| 615|| 616|| 620||621||622) {
    backgroundVideo.setAttribute('src', 'https://static.videezy.com/system/resources/previews/000/004/960/original/Winter_Branch_4K_Living_Background.mp4');
    icon[0].src = 'img/snowflake.svg';
} else if (weather.id ==  200|| 201||202|| 210||211|| 212|| 221|| 230|| 231|| 232) {
    backgroundVideo.setAttribute('src', 'https://static.videezy.com/system/resources/previews/000/001/590/original/00042.mp4');
    icon[0].src = 'img/bolt.svg';
} else if (weather.id == 801 || 802 || 803 || 804) {
    backgroundVideo.setAttribute('src', 'https://static.videezy.com/system/resources/previews/000/004/956/original/Sunray_Clouds_4K_Living_Background.mp4');
    icon[0].src = 'img/clouds(1).svg';} 
}


