const input = document.querySelector("#search");
const searchButton = document.getElementById("search-btn");
const city = document.querySelector(".city");
const date = document.querySelector(".date");
const temp = document.querySelector(".temp");

class Weather {
    constructor (temp, feels_like, humidity, pressure, temp_max, temp_min) {
        this.temp = temp;
        this.feels_like = feels_like;
        this.humidity = humidity;
        this.pressure = pressure;
        this.temp_max = temp_max,
        this.temp_min = temp_min;
    } 
}

class Location {
    constructor (lat, lon, city, country, ) {
        this.lat = lat;
        this.lon = lon;
        this.city = city;
        this.country = country;
    }
}

searchButton.addEventListener('click', async() => {
    let inputCity = input.value;
    let weather = await getWeather(inputCity);
    console.log(weather)
    city.innerText = `${weather.city}, ${weather.country}`;
    date.innerText = new Date().toLocaleTimeString();
    temp.innerText = ` ${kelvinToFahrenheit(weather.temp)}`;
    
});


let kelvinToFahrenheit = (kelvin) => {
    let fahrenheit = (9/5) * (kelvin-273) + 32;
    return Math.round(fahrenheit);
}

let getLocation = async(input) => {
    try {
        let locationData = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=38a4497c5bdfd40114228ba9fcf7e3b8`);
        let location = await locationData.json();
        console.log(location)
        let {lon, lat, name, country} = location[0];
        let myLocation = new Location(lat, lon, name, country);
        return myLocation;
    } catch (error) {
        console.log(error);
        console.log("getLocation error");
    }
}


let getWeather = async(input) => {
    try {
        console.log("we in it");
        let location = await getLocation(input);
        let {lat, lon} = location;
        console.log(location)
        let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=38a4497c5bdfd40114228ba9fcf7e3b8`);
        let weather = await data.json();
        console.log(weather);
        const { temp, feels_like, humidity, pressure, temp_max, temp_min } = weather.main;
        let myWeather = new Weather(temp, feels_like, humidity, pressure, temp_max, temp_min);
        return myWeather;
    } catch (error) {
        console.log(error);
    }
}
