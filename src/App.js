import "./App.css";
import { useEffect, useRef, useState } from "react";
import StandardWeather from "./components/StandardWeather";

import TempGraph from "./components/TempGraph";

const API_KEY = "efd3c78cb17d51e687e7a1314415949f";

function App() {
  const [theme, setTheme] = useState("");
  const [validStandardData, setValidStandardData] = useState(false);
  const [validDetailedData, setValidDetailedData] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [placeholderCity, setPlaceholderCity] = useState("");
  const [tempCity, setTempCity] = useState("");
  const [city, setCity] = useState("");
  const [standardWeather, setStandardWeather] = useState();
  const [detailedWeather, setDetailedWeather] = useState();

  useEffect(() => {
    let storedCity = localStorage.getItem("city");
    if (storedCity === null || storedCity === "") {
      storedCity = "London";
      localStorage.setItem("city", storedCity);
    }
    updateCity(storedCity);

    let storageTheme = localStorage.getItem("theme");
    if (storageTheme === null || storageTheme === "") {
      storageTheme = "bg-light text-dark";
      localStorage.setItem("theme", storageTheme);
    }
    setTheme(storageTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const switchThemeClick = () => {
    if (theme === "bg-light text-dark") setTheme("bg-dark text-white");
    else setTheme("bg-light text-dark");
  };

  const isInitialMountCity = useRef(true);
  const isInitialMountStandardWeather = useRef(true);
  const isInitialMountDetailedWeather = useRef(true);

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

  useEffect(() => {
    if (isInitialMountCity.current) {
      isInitialMountCity.current = false;
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
          setStandardWeather(response);
        })
        .catch((error) => {
          setValidStandardData(false);
          setLoaded(false);
          console.error("Error:", error);
        });
    }
  }, [city]);

  useEffect(() => {
    if (isInitialMountStandardWeather.current) {
      isInitialMountStandardWeather.current = false;
    } else {
      setValidStandardData(true);
      setLoaded(true);
      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          standardWeather.coord.lat +
          "&lon=" +
          standardWeather.coord.lon +
          "&exclude={part}&appid=" +
          API_KEY
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          setDetailedWeather(response);
          setLoaded(true);
        })
        .catch((error) => {
          setValidDetailedData(false);
          setLoaded(false);
          console.error("Error:", error);
        });
    }
  }, [standardWeather]);

  useEffect(() => {
    if (isInitialMountDetailedWeather.current) {
      isInitialMountDetailedWeather.current = false;
    } else {
      setValidDetailedData(true);
      console.log(detailedWeather);
      setLoaded(true);
    }
  }, [detailedWeather]);

  return (
    <div className={`App ${theme}`}>
      <div className={`container-fluid ${theme}`}>
        <div className="row">
          <div className="col-sm w-auto p-5">
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
            {validStandardData && loaded && (
              <StandardWeather
                theme={theme}
                standardWeather={standardWeather}
              ></StandardWeather>
            )}
            {validDetailedData && (
              <div>
                <TempGraph
                  detailedWeather={detailedWeather}
                  theme={theme}
                ></TempGraph>
              </div>
            )}
            {!validStandardData && (
              <div className={`card mb-3 ${theme}`}>
                <div className="card-body">
                  <h5 className="card-title">Please select a valid city</h5>
                </div>
              </div>
            )}
            {!loaded && (
              <div className={`card mb-3 ${theme}`}>
                <div className="card-body">
                  <div className="spinner-grow" role="status" />
                </div>
              </div>
            )}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={switchThemeClick}
              style={{ marginBottom: "30px" }}
            >
              Switch theme
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
