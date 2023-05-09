import { useEffect, useState } from "react";
import { getCoordinates } from "./services/getCoordinates";
import { getCurrentWeather } from "./services/getCurrentWeather";

import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    const loadWeather = async () => {
      const coordinates = await getCoordinates();

      if (coordinates) {
        const weatherInfo = await getCurrentWeather(
          coordinates.latitude,
          coordinates.longitude
        );
        setWeather(weatherInfo);
      }
    };

    loadWeather();
  }, []);

  return (
    <div className="general_container">
      <h1 className="title">Weather App</h1>
      {weather ? (
        <div className="container">
          <article>
            <h2>{weather.weather.main}</h2>
            <p>{weather.weather.description}</p>
            <p>
              {isCelsius
                ? weather.temperature.celsius.toFixed(2)
                : weather.temperature.farenheit.toFixed(2)}{" "}
              °{isCelsius ? "C" : "F"}
            </p>
            <div>
              <img
                src={weather.weather.icon}
                alt={weather.weather.description}
              />
            </div>
            <p>
              {weather.city}, {weather.country}
            </p>
          </article>
          <button
            className="btn_container"
            onClick={() => setIsCelsius(!isCelsius)}
          >
            CHANGE °{isCelsius ? "F" : "C"}{" "}
          </button>
        </div>
      ) : (
        <p>Loading weather ...</p>
      )}
    </div>
  );
}

export default App;
