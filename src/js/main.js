import "./../css/style.css"

const apiKey = "1ffb553ccef91471d7034115721c2a78";

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const videoBackground = document.querySelector(".video");

searchBox.value = "";

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if(response.status === 404) {
    
    document.querySelector(".error").style.display = "block"; 
    document.querySelector(".weather").style.display = "none";
   } else {
    const data = await response.json()
    searchBox.value = "";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "&deg";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "m/s";

    if(data.weather[0].main === "Clouds") {
      weatherIcon.src = "img/clouds.png";
      videoBackground.src = "videos/cloudy.mp4"
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "img/clear.png";
      videoBackground.src = "videos/clearSky.mp4"
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "img/rain.png";
      videoBackground.src = "videos/raining.mp4"
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "img/drizzle.png";
    } else if(data.weather[0].main === "Mist") {
      weatherIcon.src = "img/mist.png";
    } else if (data.weather[0].main === "Snow") {
      weatherIcon.src = "img/snow.png";
      videoBackground.src = "videos/snowing.mp4"
    }

  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none"; 
   }

  

  
  
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
})

searchBox.addEventListener("keydown", function(event) {
  if(event.keyCode === 13) {
    checkWeather(searchBox.value);
  }
})

checkWeather()


