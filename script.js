const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

const apikey = "559e706c51965007e2174b479ade2403";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;

  if (city) {
    try {
      localStorage.setItem("lastCity", city); // ✅ Save to localStorage
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError("Can't Find City");
    }
  } else {
    displayError("Please Enter a City");
  }
});

async function getWeatherData(city) {
  const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
  const response = await fetch(apiurl);
  if (!response.ok) {
    throw new Error("Could Not Fetch Weather Data");
  }
  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
    wind: { speed },
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("p");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const windDisplay = document.createElement("p");
  const RightDiv = document.createElement("div");
  const Block = document.createElement("div");
  const Humidblock = document.createElement("div");
  const windblock = document.createElement("div");
  const HumidImg = document.createElement("img");
  const windImg = document.createElement("img");
  const weatherEmoji = document.createElement("p");
  const LeftDiv = document.createElement("div");
  weatherEmoji.textContent = displayWeatherEmoji(id);
  LeftDiv.classList.add(".Left");
  HumidImg.src = "images/humidity.jpg";
  windImg.src = "images/wind-vector-icon.jpg";
  HumidImg.classList.add("humidityImg");
  windImg.classList.add("windImg");
  tempDisplay.textContent = `${(temp - 273.15).toFixed(0)}°C`;
  cityDisplay.textContent = city;
  descDisplay.textContent = description;
  humidityDisplay.innerHTML = `${humidity}% <br> Humidity`;
  windDisplay.innerHTML = `${speed}Km/h <br> Wind Speed`;
  humidityDisplay.classList.add("humidityDisplay");
  RightDiv.classList.add("Right");
  descDisplay.classList.add("descDisplay");
  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  Humidblock.classList.add("humidityblock");
  windblock.classList.add("windblock");
  Block.classList.add("block");
  weatherEmoji.classList.add("Left");
  LeftDiv.appendChild(weatherEmoji);
  Humidblock.appendChild(HumidImg);
  Humidblock.appendChild(humidityDisplay);
  windblock.appendChild(windImg);
  windblock.appendChild(windDisplay);
  Block.appendChild(Humidblock);
  Block.appendChild(windblock);
  RightDiv.appendChild(tempDisplay);
  RightDiv.appendChild(descDisplay);
  RightDiv.appendChild(cityDisplay);
  RightDiv.appendChild(Humidblock);
  RightDiv.appendChild(Block);
  card.appendChild(LeftDiv);
  card.appendChild(RightDiv);
}

function displayWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "⛈️";
    case weatherId >= 300 && weatherId < 400:
      return "🌦️";
    case weatherId >= 500 && weatherId < 600:
      return "🌧️";
    case weatherId >= 600 && weatherId < 700:
      return "❄️";
    case weatherId >= 700 && weatherId < 781:
      return "🌫️";
    case weatherId >= 781 && weatherId < 800:
      return "🌪️";
    case weatherId === 800:
      return "☀️";
    case weatherId >= 801 && weatherId < 810:
      return "☁️";
    default:
      return "❓";
  }
}

function displayError(message) {
  card.textContent = "";
  const ErrorDiv = document.createElement("div");
  const img = document.createElement("img");
  img.src = "images/City.webp";
  img.classList.add("errorImg");
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");
  ErrorDiv.classList.add("errorDiv");
  card.style.display = "flex";
  ErrorDiv.appendChild(img);
  ErrorDiv.appendChild(errorDisplay);
  card.appendChild(ErrorDiv);
}

// ✅ Load previous city on page load
window.addEventListener("DOMContentLoaded", async () => {
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    try {
      const weatherData = await getWeatherData(lastCity);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError("Can't load previous weather data");
    }
  }
});
