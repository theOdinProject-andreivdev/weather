import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [weather, setWeather] = useState({
    city: "London",
    country: "GB",
    main: "Clouds",
    description: "broken clouds",
    temp: 284.43,
    feels_like: 282.01,
    temp_min: 283.71,
    temp_max: 285.15,
    pressure: 1023,
    humidity: 93,
    icon: "http://openweathermap.org/img/wn/04d@2x.png",
  });

  return (
    <div className="App">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm w-auto p-5 bg-light text-dark">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="London"
                aria-label="Location"
                aria-describedby="button-addon2"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                >
                  Get Weather
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="card mb-3">
              <img
                src={weather.icon}
                class="card-img-top mx-auto"
                alt="..."
                style={{ width: "100px" }}
              />
              <div class="card-body">
                <h5 class="card-title">
                  Weather in {weather.city}, {weather.country}
                </h5>
                <p class="card-text">
                  Currently it feels like{" "}
                  {Math.round(weather.feels_like - 273.15)}°C in {weather.city}
                  <br />
                  {weather.main} - {weather.description}
                </p>
                <p class="card-text">
                  <small class="text-muted">
                    <div class="card">
                      <div class="card-body">
                        Minimum temperature:{" "}
                        {Math.round(weather.temp_min - 273.15)}°C
                        <br />
                        Maximum temperature:{" "}
                        {Math.round(weather.temp_max - 273.15)}°C
                        <br />
                        Pressure: {weather.pressure}hPa
                        <br />
                        Humidity: {weather.humidity}%
                        <br />
                      </div>
                    </div>
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
