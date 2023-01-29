
import { useState } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import "./App.css";

function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
   

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log);
  };


  console.log(currentWeather);
  let tem = null;
  if(currentWeather != null){
   console.log(currentWeather.main.temp);
   tem = Math.round(currentWeather.main.temp);
  }

  function getBackgroundClasses() {
    let classes = " whole ";
    if(tem === null){
      classes += " ";
    }
    else if (tem < 10) {
      classes += "cold";
    }
    else if (tem > 10 && tem < 30) {
      classes += "modrate";
    }
    else if(tem>30) {
      classes += "hot";
    }
    return classes;
  }

  return (
   <div className= {getBackgroundClasses()}>
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
    </div>
  );



}

export default App;

