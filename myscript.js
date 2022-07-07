const input = document.querySelector("#search");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");



// temp.innerText += 


class Weather {
    constructor (city, country, temp, feels_like, humidity, pressure) {
        this.city = city;
        this.country = country;
        this.temp = temp;
        this.feels_like = feels_like;
        this.humidity = humidity;
        this.pressure = pressure;
    } 
}

input.addEventListener('keypress', async(e) => {
    if (e.key === 'Enter') {
        let weather = await getWeather();
        city.innerText = `${weather.city}, ${weather.country}`;
        temp.innerText = ` ${kelvinToFahrenheit(weather.temp)}`;
    }
});


let kelvinToFahrenheit = (kelvin) => {
    let fahrenheit = (9/5) * (kelvin-273) + 32;
    return Math.round(fahrenheit);
}


let getWeather = async() => {
    try {
        const data = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=39.347200&lon=-76.480720&appid=38a4497c5bdfd40114228ba9fcf7e3b8")
        const weather = await data.json();
        console.log(weather);
        const city = weather.name;
        const country = weather.sys.country;
        const { temp, feels_like, humidity, pressure } = weather.main;
        let myWeather = new Weather(city, country, temp, feels_like, humidity, pressure);
        console.log(myWeather)
        return myWeather;
    } catch (error) {
        console.log(error);
    }
}
