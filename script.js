const buttons = document.querySelectorAll("button.accordion_button");
const arrows = document.querySelectorAll("i.fa-caret-down");

function openItem() {
    if (this.nextElementSibling.classList.contains('active_box')) {
        this.nextElementSibling.classList.remove('active_box');
        this.lastElementChild.classList.remove('active_arrow');
    } else {
        closeItem();
        this.nextElementSibling.classList.toggle('active_box');
        this.lastElementChild.classList.toggle('active_arrow');
    }
}

const closeItem = () => {
    const activeBoxes = document.querySelectorAll('.info');
    activeBoxes.forEach(box => {
        box.classList.remove('active_box')
    })
    arrows.forEach(arrow => {
        arrow.classList.remove('active_arrow')
    })
}

buttons.forEach(button => {
    button.addEventListener('click', openItem);
})

//obsługa API
const sunriseHour = document.querySelector('p.sunrise_hour');
const sunsetHour = document.querySelector('p.sunset_hour');
const temp = document.querySelector('p.temp');
const weatherImg = document.querySelector('img.weather_img');
const weatherDescription = document.querySelector('p.weather_description');
const feelsLike = document.querySelector('span.feels_like');
const pressure = document.querySelector('span.pressure');
const humidity = document.querySelector('span.humidity');
const windSpeed = document.querySelector('span.wind_speed');
const clouds = document.querySelector('span.clouds');
const visibility = document.querySelector('span.visibility');

const apiInfo = {
    link: 'https://api.openweathermap.org/data/2.5/weather?q=',
    city: 'Seul',
    key: '&appid=86e9154a12a597110a18b22a94438b87',
    units: '&units=metric',
    lang: '&lang=pl'
}

const apiURL = `${apiInfo.link}${apiInfo.city}${apiInfo.key}${apiInfo.units}${apiInfo.lang}`;

//console.log(apiURL);

function getWeatherData() {
    axios.get(apiURL).then((response) => {
        console.log(response);
        const sunrise = response.data.sys.sunrise;
        const timezone = response.data.timezone;

        const localSunrise = new Date((sunrise + timezone) * 1000)

        const sunriseTime = localSunrise.toLocaleString('pl-PL', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC'
        })

        const sunset = response.data.sys.sunset;

        const localSunset = new Date((sunset + timezone) * 1000)

        const sunsetTime = localSunset.toLocaleString('pl-PL', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC'
        })

        sunsetHour.textContent = sunsetTime
        sunriseHour.textContent = sunriseTime
        weatherImg.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
        weatherDescription.textContent = `${response.data.weather[0].description}`;
        temp.textContent = `${Math.round(response.data.main.temp)}℃`;
        feelsLike.textContent = `${Math.round(response.data.main.feels_like)}℃`;
        humidity.textContent = `${response.data.main.humidity}%`;
        pressure.textContent = `${response.data.main.pressure}hPa`;
        windSpeed.textContent = `${response.data.wind.speed}m/s`;
        clouds.textContent = `${response.data.clouds.all}%`;
        visibility.textContent = `${response.data.visibility}m`;
    })
}

getWeatherData();