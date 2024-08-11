//WEATHER APP

const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".cityinput");
const card = document.querySelector(".card")
const apiKey = "84cf4e610f3f093d4e10735f7e725a73"

weatherform.addEventListener("submit",async event => {

    event.preventDefault();

    const city = cityinput.value;

    if(city) {
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData)
        }
        catch(error) {
            console.error(error)
            displayError(error)
        }
    }

    else{
        displayError("Please enter a city")
    }
});

async function getWeatherData(city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    const response = await fetch(apiURL);

    if(!response.ok){
        throw new Error("Failed to fetch weather data")
    }

    return await response.json();
}

function displayWeatherInfo(data) {
    
    const { name:city,
            main: { temp, humidity },
            weather: [{ description, id }] } = data;
            
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humiditydisplay = document.createElement("p");
    const descdisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15) .toFixed(1)}°C`;
    humiditydisplay.textContent = `Humidity: ${humidity}%`;
    descdisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("citydisplay");
    tempDisplay.classList.add("tempreature");
    humiditydisplay.classList.add("humiditydisplay");
    descdisplay.classList.add("discription");
    weatherEmoji.classList.add("weatheremoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humiditydisplay);
    card.appendChild(descdisplay);
    card.appendChild(weatherEmoji);
}  

function getWeatherEmoji(weatherId) {

    switch(true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
             return "☁️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "❓";

    }

}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay)
}

/*
        <h1 class="citydisplay">Bhind</h1>
        <p class="tempreature">90°F</p>
        <p class="humiditydisplay">Humidity 75%</p>
        <p class="discription">Clear Skies</p>
        <p class="weatherEmoji">🌞</p>
        <p class="errorDisplay">Please Enter a city</p>*/