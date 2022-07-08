const input = document.querySelector("#search");
const searchButton = document.getElementById("search-btn");
const city = document.querySelector(".city");
const date = document.querySelector(".date");
const temp = document.querySelector(".temp");

class Weather {
    constructor (city, country, temp, feels_like, humidity, pressure, temp_max, temp_min) {
        this.city = city;
        this.country = country;
        this.temp = temp;
        this.feels_like = feels_like;
        this.humidity = humidity;
        this.pressure = pressure;
        this.temp_max = temp_max,
        this.temp_min = temp_min;
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


let getWeather = async(input) => {
    try {
        const locationData = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=38a4497c5bdfd40114228ba9fcf7e3b8`);
        const location = await locationData.json();
        const {lon, lat} = location[0];
        console.log(lon, lat);
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=38a4497c5bdfd40114228ba9fcf7e3b8`);
        const weather = await data.json();
        console.log(weather);
        const city = weather.name;
        const country = weather.sys.country;
        const { temp, feels_like, humidity, pressure, temp_max, temp_min } = weather.main;
        let myWeather = new Weather(city, country, temp, feels_like, humidity, pressure, temp_max, temp_min);
        return myWeather;
    } catch (error) {
        console.log(error);
    }
}
