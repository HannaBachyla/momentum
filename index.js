const bgNum = getRandomNum();
let audioNumber = 0;
let isPlay = false;


// TIME AND DATE

const time = document.querySelector('.time');
const data = document.querySelector('.date');

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    function showDate () {
        const options = {weekday: 'long', month: 'long', day: 'numeric'};
        const currentDate = date.toLocaleDateString('en-US', options);
        data.textContent = currentDate
    }
    showDate ()
    setTimeout(showTime, 1000);
}
showTime();

// GREETING

const greeting = document.querySelector('.greeting');
const date = new Date();
const hours = date.getHours();
console.log(hours);

function getTimeOfDay() {
  if (hours >= 6 && hours < 12) {
    return 'morning'
  } else if (hours >= 12 && hours < 18) {
    return 'afternoon'
  } else if (hours >= 18 && hours < 24) {
    return 'evening'
  } else if (hours >= 0 && hours < 6) {
    return 'night'
  } 
}

const timeOfDay = getTimeOfDay();
greeting.textContent = `Good ${timeOfDay}, `;


//IMAGES

const body = document.querySelector('.body');
const rightImg = document.querySelector('.slide-next');
const leftImg = document.querySelector('.slide-prev');


function getRandomNum() {
  min = Math.ceil(1);
  max = Math.floor(20);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log (getRandomNum())

rightImg.addEventListener("click", function (e) {
  setBg();
});

leftImg.addEventListener("click", function (e) {
  setBg();
});

function setBg() {
  const timeOfDay = getTimeOfDay();
  const bgNum = getRandomNum();
  const img = new Image();
  img.src = "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/" + timeOfDay + "/" + bgNum.toString().padStart(2, '0') + ".jpg";
  img.onload = () => {
    body.style.backgroundImage = "url('" + img.src + "')";
  }
}
setBg()



//WEATHER

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

const city = document.querySelector('.city');

city.addEventListener("change", function (e) {
  getWeather();
});

city.value = 'Минск'

async function getWeather() {
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=eng&appid=04c1b2e6960a4c6ae50facbc87178921&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind ${data.wind.speed.toFixed(0)}m/s`;
    humidity.textContent = `Humidity ${data.main.humidity.toFixed(0)}%`;

  }
  getWeather()

//LOCAL STORAGE

const name = document.querySelector('.name');
name.value = "";
function setLocalStorage() {
  localStorage.setItem('name', name.value);
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
  if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }

}
window.addEventListener('load', getLocalStorage)
  


//QUOTES

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const buttonQuote = document.querySelector('.change-quote');

buttonQuote.addEventListener("click", function(e) {
  getQuotes()
})

async function getQuotes() {  
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json(); 

var rand = Math.floor(Math.random() * data.length);

   quote.textContent = data[rand].text;
   author.textContent = data[rand].author;

  }
  getQuotes();


// AUDIO

const audio = document.querySelector('.audio');
const buttonPlay = document.querySelector('.play');
const buttonNext = document.querySelector('.play-next');
const buttonPrev = document.querySelector('.play-prev')

const audioPlayList = document.querySelector('.play-list');

let li = document.querySelector('.audioName');
let len = li.length - 1;

let audio1 = document.querySelector('.audio1');
let audio2 = document.querySelector('.audio2');
let audio3 = document.querySelector('.audio3');
let audio4 = document.querySelector('.audio4');


function playAudio() {
  if (!isPlay) {
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    buttonPlay.classList.add('pause')
  } else {
    audio.pause();
    isPlay = false;  
    buttonPlay.classList.remove('pause')
  }
}

buttonPlay.addEventListener('click', playAudio);

 function playNext() {
 audio = audio1;
 playAudio()
 }

 function playPrev() {
 
 }
 buttonNext.addEventListener('click', playNext);
 buttonPrev.addEventListener('click', playPrev);