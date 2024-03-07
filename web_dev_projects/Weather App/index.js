const apiKey = '3a1a0d958d35caa6a3cda5177741c0b2';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon  = document.querySelector('.weather-icon');

// updates the current year, month, and day in the website
const now = new Date(); // Create a new Date object with the current date and time
// console.log(now);
const month = now.toLocaleString('default', { month: 'long' }); // gets month as string eg:jan to dec for 0 to 11
const day = now.getDate();
const year = now.getFullYear();
document.querySelector('.month').innerHTML = month;
document.querySelector('.day').innerHTML = day;
document.querySelector('.year').innerHTML = year;

async function getWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404 || response.status == 400){
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.body-container').style.display = 'none';
        document.querySelector('.end-body').style.display = 'none';

        const duration = 5000; //duration in milliseconds // which is equ to (3 seconds)
        setTimeout(function(){
            document.querySelector('.error').style.display = 'none';
        }, duration);
    }
    else{
        var data = await response.json();

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.country').innerHTML = data.sys.country;
        document.querySelector('.temperature').innerHTML = Math.round(data.main.temp) + '°C';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + `km/hr`;

        let visible = data.visibility;
        var inkm = Number(visible) / 1000;
        document.querySelector('.visibility').innerHTML = data.visibility + `m/ ${inkm}` +'km'; 

        document.querySelector(".main-weather").innerHTML = data.weather[0].main;


        if(data.weather[0].main === 'Clear'){
            weatherIcon.src = 'images/clear.png'
        }
        else if(data.weather[0].main === 'Clouds'){
            weatherIcon.src = 'images/cloud.png'
        }
        else if(data.weather[0].main === 'Snow'){
            weatherIcon.src = 'images/snow.png'
        }
        else if(data.weather[0].main === 'Rain'){
            weatherIcon.src = 'images/rain.png'
        }
        else if(data.weather[0].main === 'Drizzle'){
            weatherIcon.src = 'images/drizzle.png'
        }
        else if(data.weather[0].main === 'thunderstorm'){
            weatherIcon.src = 'images/thunderstorm.png'
        }
        else if(data.weather[0].main === 'Mist'){
            weatherIcon.src = 'images/mist.png'
        }
        else if(data.weather[0].main === 'Haze'){
            weatherIcon.src = 'images/haze.png'
        }



        document.querySelector('.error').style.display = 'none';
        document.querySelector('.body-container, .end-body').style.display = 'flex';
        document.querySelector('.end-body').style.display = 'flex';

    }
    // this prints the api data in console. no need to do it but its done for convinence
    console.log(data);
}

searchBtn.addEventListener("click", ()=>{
    getWeather(searchBox.value);
});

document.getElementById('search-input').addEventListener('keyup', function(event){
if(event.key === 'Enter') {
    getWeather(searchBox.value);
}
});
