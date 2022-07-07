const input = document.querySelector("#search");
const temp = document.querySelector(".temp");



// temp.innerText += 


class Weather {
    constructor (city, temp, feels_like, humidity, pressure) {
        this.city = city;
        this.temp = temp;
        this.feels_like = feels_like;
        this.humidity = humidity;
        this.pressure = pressure;
    } 
}

input.addEventListener('keypress', async(e) => {
    if (e.key === 'Enter') {
        let weather = await getWeather();
        temp.innerText += ` ${kelvinToFahrenheit(weather.temp)}`;
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
        let city = weather.name;
        let objData = weather.main;
        const { temp, feels_like, humidity, pressure } = objData;
        let myWeather = new Weather(city, temp, feels_like, humidity, pressure);
        return myWeather;
    } catch (error) {
        console.log(error);
    }
}
