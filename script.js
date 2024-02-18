async function app(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=c00fff0423ab4958aa7162515241802&q=${city}`,
      { mode: "cors" }
    );
    const weather = await response.json();
    return weather;
  } catch (error) {
    return error;
  }
}
const cityData = document.querySelector(".city");
const tempData = document.querySelector(".temp");
const statusData = document.querySelector(".status");
const body = document.querySelector("body");
document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();
  const city = e.target.input.value;
  displayWeather(city);
  e.target.input.value = "";
});

async function displayWeather(city) {
  const weather = await app(city);
  if (weather.error) {
    cityData.innerHTML = "City not found";
    tempData.innerHTML = "";
    statusData.innerHTML = "";
  } else {
    cityData.innerHTML =
      weather.location.name + ", " + weather.location.country;
    tempData.innerHTML = `${weather.current.temp_c}<sup>°C</sup>`;
    statusData.innerHTML = weather.current.condition.text;
    if (
      weather.current.condition.text.toLowerCase().includes("cloudy") ||
      weather.current.condition.text.toLowerCase().includes("overcast")
    ) {
      body.style.backgroundImage = "url('images/cloudy.jpg')";
    } else if (weather.current.condition.text.toLowerCase().includes("sunny")) {
      body.style.backgroundImage = "url('images/sunny.jpg')";
    } else if (weather.current.condition.text.toLowerCase().includes("rain")) {
      body.style.backgroundImage = "url('images/rain.jpg')";
    } else {
      body.style.backgroundImage = "url('images/clear.jpg')";
    }
  }
}
