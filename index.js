'use strict';

/*
Popis úkolu a podrobný návod najdeš v souboru README.md

Zde následuje tvůj úžasný program! ❤
*/


const API_KEY = '41ec099969977d46de1d005ddc517e4c';
const API_BASE = 'https://api.openweathermap.org/data/2.5/weather?cz&units=metric&lang=cz&appid=41ec099969977d46de1d005ddc517e4c'
const API_BASE2 = 'https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,hourly&units=metric&appid=41ec099969977d46de1d005ddc517e4c'

const weekday = new Array(7);
weekday[0] = "Nedeľa";
weekday[1] = "Pondelok";
weekday[2] = "Utorok";
weekday[3] = "Streda";
weekday[4] = "Štvrtok";
weekday[5] = "Piatok";
weekday[6] = "Sobota";


pocasieMesta('&lat=49.195061&lon=16.606836', 'Brno')

document.getElementById("brno").onclick = function() {
    pocasieMesta('&lat=49.195061&lon=16.606836', 'Brno');
    document.body.style.backgroundImage = "url('images/brno.jpg')";
}

document.getElementById("praha").onclick = function() {
    pocasieMesta('&lat=50.08804&lon=14.42076', 'Praha');
    document.body.style.backgroundImage = "url('images/praha.jpg')";
}

document.getElementById("sydney").onclick = function() {
    pocasieMesta('&lat=-33.865143&lon=151.209900', 'Sydney');
    document.body.style.backgroundImage = "url('images/sydney.jpg')";
}

document.getElementById("bratislava").onclick = function() {
    pocasieMesta('&lat=48.148598&lon=17.10774', 'Bratislava');
    document.body.style.backgroundImage = "url('images/bratislava.jpg')";
}

function pocasieMesta(suradnice, mesto) {


    fetch(API_BASE2 + suradnice)
        .then(response => response.json())
        .then(predpoved);



    fetch(API_BASE + '&q=' + mesto)
        .then(response => response.json())
        .then(zobrazPocasi);
}

function pad(num) {
    return ("0" + num).slice(-2);
}

function getTimeFromDate(timestamp, timezone) {
    let date = new Date((timestamp + timezone) * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return pad(hours) + ":" + pad(minutes)
}

function zobrazPocasi(data) {

    let timezone = 0;
    if (data.name == 'Sydney') {
        timezone = 10 * 3600;
    }


    let novaIkona = getWeatherIcon(data.weather[0].id, data.weather[0].icon);
    let ikonaElement = document.querySelector('#ikona');
    console.log(data.weather[0].id);
    console.log(data.weather[0].icon);

    ikonaElement.innerHTML = novaIkona;

    document.getElementById('teplota').innerHTML = Math.round(data.main.temp);
    document.getElementById('vitr').innerHTML = data.wind.speed;
    document.getElementById('popis').innerHTML = data.weather[0].description;
    document.getElementById('vlhkost').innerHTML = data.main.humidity;
    document.getElementById('vychod').innerHTML = getTimeFromDate(data.sys.sunrise, timezone);
    document.getElementById('zapad').innerHTML = getTimeFromDate(data.sys.sunset, timezone);
    document.getElementById('mesto').innerHTML = data.name;

}

function getDateFromDate(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let den = weekday[date.getDay()];
    return den + " " + day + "." + month + "."
}

function predpoved(data) {

    for (let i = 1; i <= 4; i++) {

        document.querySelector(".predpoved" + i + '>.forecast__temp').innerHTML = Math.round(data.daily[i].temp.day) + '°C';
        document.querySelector(".predpoved" + i + '>.forecast__day').innerHTML = getDateFromDate(data.daily[i].dt);

        let novaIkona = getWeatherIcon(data.daily[i].weather[0].id, data.daily[i].weather[0].icon);
        let ikonaElement = document.querySelector(".predpoved" + i + '>.forecast__icon');
        ikonaElement.innerHTML = novaIkona;
    }

}