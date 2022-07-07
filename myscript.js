const input = document.getElementById("#city");

let x = input.


let div = document.createElement("h3");


let kelvinToFahrenheit = (kelvin) => {
    let fahrenheit = (9/5) * (kelvin-273) + 32;
    return Math.round(fahrenheit);
}


let getWeather = async() => {
    try {
        const data = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=39.347200&lon=-76.480720&appid=38a4497c5bdfd40114228ba9fcf7e3b8")
        const weather = await data.json();
        let kelvin = weather.main.temp;
        console.log(kelvinToFahrenheit(kelvin));
    } catch (error) {
        console.log(error);
    }
}

getWeather();