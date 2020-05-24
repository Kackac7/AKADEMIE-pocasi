'use strict';

/*
Popis úkolu a podrobný návod najdeš v souboru README.md

Zde následuje tvůj úžasný program! ❤
*/


//let novaIkona = getWeatherIcon(data.weather[0].id, data.weather[0].icon);

const API_KEY = '41ec099969977d46de1d005ddc517e4c';
const API_BASE = 'https://api.openweathermap.org/data/2.5/weather?cz&units=metric&lang=cz&appid=41ec099969977d46de1d005ddc517e4c'

this.humidity = 0

fetch(API_BASE + '&q=Brno')
    .then(response => response.json())
    .then(zobrazPocasi);

function pad(num) {
    return ("0" + num).slice(-2);
}

function getTimeFromDate(timestamp) {
    var date = new Date(timestamp * 1000);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    return pad(hours) + ":" + pad(minutes)
}

function zobrazPocasi(data) {
    console.log(data);
    console.log(data.weather[0].description); //dezd
    console.log(data.wind.speed); //speed
    console.log(data.name); //brno
    console.log(data.main.temp); //teplota
    console.log(data.main.humidity); //vlhkost
    console.log(data.sys.sunrise); //vychod
    console.log(data.sys.sunset); //zapad
    console.log(data.weather[0].id); //vychod

    let novaIkona = getWeatherIcon(data.weather[0].id, data.weather[0].icon);
    let ikonaElement = document.querySelector('#ikona');

    ikonaElement.innerHTML = novaIkona;
    //$("#teplota").val(data.main.temp);
    document.getElementById('teplota').innerHTML = data.main.temp;
    document.getElementById('teplota').innerHTML = data.main.temp;
    document.getElementById('vitr').innerHTML = data.wind.speed;
    document.getElementById('popis').innerHTML = data.weather[0].description;
    document.getElementById('vlhkost').innerHTML = data.main.humidity;
    document.getElementById('vychod').innerHTML = getTimeFromDate(data.sys.sunset);
    document.getElementById('zapad').innerHTML = getTimeFromDate(data.sys.sunrise);
    document.getElementById('mesto').innerHTML = data.name;

}