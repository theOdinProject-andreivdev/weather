function StandardWeather(props) {
  return (
    <div className={`card mb-3 ${props.theme}`}>
      <img
        src={
          "http://openweathermap.org/img/wn/" +
          props.standardWeather.weather[0].icon +
          "@2x.png"
        }
        className="card-img-top mx-auto"
        alt="..."
        style={{ width: "100px" }}
      />
      <div className="card-body">
        <h5 className="card-title">
          Weather in {props.standardWeather.name},{" "}
          {props.standardWeather.sys.country}
        </h5>
        <p className="card-text">
          Currently it feels like{" "}
          {Math.round(props.standardWeather.main.feels_like - 273.15)}°C in{" "}
          {props.standardWeather.name}
          <br />
          {props.standardWeather.weather[0].main} -{" "}
          {props.standardWeather.weather[0].description}
        </p>
        <div className="card-text">
          <small className="text-muted">
            <div className={`card ${props.theme}`}>
              <div className={`card-body ${props.theme}`}>
                Minimum temperature:{" "}
                {Math.round(props.standardWeather.main.temp_min - 273.15)}°C
                <br />
                Maximum temperature:{" "}
                {Math.round(props.standardWeather.main.temp_max - 273.15)}°C
                <br />
                Pressure: {props.standardWeather.main.pressure}hPa
                <br />
                Humidity: {props.standardWeather.main.humidity}%
                <br />
              </div>
            </div>
          </small>
        </div>
      </div>
    </div>
  );
}

export default StandardWeather;
