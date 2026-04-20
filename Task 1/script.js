async function getWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "API_KEY";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    if(data.cod === 200){
        document.getElementById("weatherResult").innerHTML = `
            <h2>${data.name}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
        `;
    } else {
        document.getElementById("weatherResult").innerHTML = "City not found!";
    }
}
