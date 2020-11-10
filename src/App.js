import "./App.css";
import { useEffect, useRef, useState } from "react";

const API_KEY = "04e0dee5fe194dcd20fb3d326d8e5a4d";

function App() {
  const [validData, setValidData] = useState(false);
  const [placeholderCity, setPlaceholderCity] = useState("");
  const [tempCity, setTempCity] = useState("");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({
    city: "",
    country: "",
    main: "",
    description: "",
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    humidity: 0,
    icon: "",
  });

  useEffect(() => {
    let storedCity = localStorage.getItem("city");
    if (storedCity === null || storedCity === "") {
      storedCity = "London";
      localStorage.setItem("city", storedCity);
    }
    updateCity(storedCity);
  }, []);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&appid=" +
          API_KEY
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          setValidData(true);
          parseAndSetWeather(response);
        })
        .catch((error) => {
          setValidData(false);
          console.error("Error:", error);
        });
    }
  }, [city]);

  const handleTempCityChange = (event) => {
    setTempCity(event.target.value);
  };

  const updateCity = (city) => {
    localStorage.setItem("city", city);
    setPlaceholderCity(city);
    setCity(city);
  };

  const updateCityWithTemp = () => {
    localStorage.setItem("city", tempCity);
    setPlaceholderCity(tempCity);
    setCity(tempCity);
  };

  const parseAndSetWeather = (response) => {
    setWeather({
      city: response.name,
      country: response.sys.country,
      main: response.weather[0].main,
      description: response.weather[0].description,
      temp: response.main.temp,
      feels_like: response.main.feels_like,
      temp_min: response.main.temp_min,
      temp_max: response.main.temp_max,
      pressure: response.main.pressure,
      humidity: response.main.humidity,
      icon:
        "http://openweathermap.org/img/wn/" +
        response.weather[0].icon +
        "@2x.png",
    });
  };

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm w-auto p-5 bg-light text-dark">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder={placeholderCity}
                aria-label="Location"
                aria-describedby="button-addon2"
                onChange={handleTempCityChange}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  onClick={updateCityWithTemp}
                >
                  Get Weather
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {validData && (
              <div className="card mb-3">
                <img
                  src={weather.icon}
                  className="card-img-top mx-auto"
                  alt="..."
                  style={{ width: "100px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    Weather in {weather.city}, {weather.country}
                  </h5>
                  <p className="card-text">
                    Currently it feels like{" "}
                    {Math.round(weather.feels_like - 273.15)}°C in{" "}
                    {weather.city}
                    <br />
                    {weather.main} - {weather.description}
                  </p>
                  <div className="card-text">
                    <small className="text-muted">
                      <div className="card">
                        <div className="card-body">
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
                  </div>
                </div>
              </div>
            )}
            {!validData && (
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">Please select a valid city</h5>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
