const input = document.querySelector("#search");
const searchButton = document.getElementById("search-btn");
const city = document.querySelector(".city");
const date = document.querySelector(".date");
const container = document.querySelector(".info-card");
const temp = document.querySelector(".temp");
const high = document.querySelector(".high");
const low = document.querySelector(".low");
const desc = document.querySelector(".desc");
const conditionTwo = document.querySelector(".two");
const iconImg = document.getElementById("weather-icon");
const convertButton = document.getElementById("convert-btn");

let isFahrenheit = true;
container.style.visibility = 'hidden';

class Weather {
    constructor (temp, description, icon, feels_like, temp_max, temp_min) {
        this.temp = temp;
        this.description = description;
        this.icon = icon;
        this.feels_like = feels_like;
        this.temp_max = temp_max,
        this.temp_min = temp_min;
    } 
};

class Location {
    constructor (lat, lon, name, country) {
        this.lat = lat;
        this.lon = lon;
        this.name = name;
        this.country = country;
    }
};

searchButton.addEventListener('click', async() => {
    try {
        let inputValue = input.value;
        let location = await getLocation(inputValue);
        if (Object.keys(location).length === 0) {
            throw new Error("Unable to get location!");
        }
        let {lat, lon, name, country} = location;
        let weather = await getWeather(lat, lon);
        console.log(weather)
        city.innerText = `${name}, ${country}`;
        date.innerText = new Date().toLocaleTimeString();
        temp.innerText = ` ${kelvinToFahrenheit(weather.temp)}℉`;
        high.innerText = `High: ${kelvinToFahrenheit(weather.temp_max)}℉`;
        low.innerText = `Low: ${kelvinToFahrenheit(weather.temp_min)}℉`;
        desc.innerText = `${weather.description.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}`;
        iconImg.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
        container.style.visibility = 'visible';
    } catch (error) {
        alert(error);
        console.log(error);
    }
});

convertButton.addEventListener('click', () => {
    if (isFahrenheit) {
        temp.innerText = `${fahrenheitToCelsius(parseInt(temp.innerText))}°C`;
        high.innerText = `High: ${fahrenheitToCelsius(high.innerText.replace(/\D/g, ""))}°C`;
        low.innerText = `Low: ${fahrenheitToCelsius(low.innerText.replace(/\D/g, ""))}°C`;
        isFahrenheit = false;
    } else {
        temp.innerText = `${celciusToFahrenheit(parseInt(temp.innerText))}℉`;
        high.innerText = `High: ${celciusToFahrenheit(high.innerText.replace(/\D/g, ""))}℉`;
        low.innerText = `Low: ${celciusToFahrenheit(low.innerText.replace(/\D/g, ""))}℉`;
        isFahrenheit = true;
    }
});

let kelvinToFahrenheit = (kelvin) => {
    let fahrenheit = (9/5) * (kelvin-273) + 32;
    return Math.round(fahrenheit);
};

let fahrenheitToCelsius = (fahrenheit) => {
    let celcius = (fahrenheit - 32)/1.8;
    return Math.round(celcius);
};

let celciusToFahrenheit = (celcius)  => {
    let fahrenheit = (celcius * 1.8) + 32;
    return Math.round(fahrenheit);
};

let getLocation = async(input) => {
    try {
        let locationData = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=38a4497c5bdfd40114228ba9fcf7e3b8`);
        let location = await locationData.json();
        let {lon, lat, name, country} = location[0];
        let myLocation = new Location(lat, lon, name, country);
        return myLocation;
    } catch (error) {
        console.log(error);
        return {};
    }
};

let getWeather = async(lat, lon) => {
    try {
        let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=38a4497c5bdfd40114228ba9fcf7e3b8`);
        let weather = await data.json();
        console.log(weather);
        let { temp, feels_like, temp_max, temp_min } = weather.main;
        let {description , icon} = weather.weather[0];
        let myWeather = new Weather(temp, description, icon, feels_like, temp_max, temp_min);
        return myWeather;
    } catch (error) {
        console.log(error);
    }
};
