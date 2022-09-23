import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const apiKey = "f56f24967aaf51182d1d4df628297c6d";
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});

  const getWetherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey;
    axios
      .get(apiURL)
      .then((res) => {
        console.log("response", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  // Date
  let d = new Date();
  let date = d.getDate;
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "long" });
  let day = d.toLocaleString("default", { weekday: "long" });
  // Time
  let time = d.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  let emoji = null;

  let background = null;
  if (typeof data.main != "undefined") {
    if (data?.weather[0]?.main === "Clouds") {
      background = "assets/clouds.jpg";
    } else if (data?.weather[0]?.main === "Thunderstorm") {
      background = "assets/thunderstorm.jpg";
    } else if (data?.weather[0]?.main === "Drizzle") {
      background = "assets/drizzle.jpg";
    } else if (data?.weather[0]?.main === "Rain") {
      background = "assets/rain.jfif";
    } else if (data?.weather[0]?.main === "Snow") {
      background = "assets/snow.jpg";
    } else if (data?.weather[0]?.main === "Clear") {
      background = "assets/clear.jfif";
    } else if (data?.weather[0]?.main === "Mist") {
      background = "assets/mist.jpg";
    } else if (data?.weather[0]?.main === "Haze") {
      background = "assets/haze.jpg";
    } else {
      background = "assets/clouds.jpg";
    }
  }
  else {
    background = "assets/nature2.jpg";
  }

  if (typeof data.main != "undefined") {
    if (data?.weather[0]?.main === "Clouds") {
      emoji = "fa-cloud";
    } else if (data?.weather[0]?.main === "Thunderstorm") {
      emoji = "fa-bolt";
    } else if (data?.weather[0]?.main === "Drizzle") {
      emoji = "fa-cloud-rain";
    } else if (data?.weather[0]?.main === "Rain") {
      emoji = "fa-cloud-showers-heavy";
    } else if (data?.weather[0]?.main === "Snow") {
      emoji = "fa-snowflake";
    } else if (data?.weather[0]?.main === "Clear") {
      emoji = "fa-sun";
    } else if (data?.weather[0]?.main === "Mist") {
      emoji = "fa-smog";
    } else if (data?.weather[0]?.main === "Haze") {
      emoji = "fa-smoke";
    } else {
      emoji = "fa-smoke";
    }
  }

  const handleChangeInput = (e) => {
    // console.log("value", e.target.value);
    setInputCity(e.target.value);
  };

  const handleSearch = () => {
    getWetherDetails(inputCity);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card text-white text-center border-0">
            <img src={background} className="card-img" alt="..." height={550} />
            <div className="card-img-overlay">
              <form>
                <div className="input-group mb-4 w-75 mx-auto">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search City"
                    value={inputCity}
                    onChange={handleChangeInput}
                  />
                  <button
                    type="button"
                    className="input-group-text"
                    id="basic-addon2"
                    onClick={handleSearch}
                  >
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
              {Object.keys(data).length > 0 && (
                <div className="bg-opacity-50 bg-dark py-3">
                  <h2 className="card-title">{data?.name}</h2>
                  <p className="card-text lead">
                    {day}, {month} {date}, {year}
                    <br />
                    {time}
                  </p>
                  <hr></hr>
                  <i className={`fas ${emoji} fa-4x`}></i>

                  <h1 className="fw-bolder mb-5">
                    {(data?.main?.temp - 273.15).toFixed(2)} &deg;C
                  </h1>
                  <p className="lead fw-bolder mb-0">
                    {data?.weather[0]?.main}
                  </p>
                  <p className="lead">
                    {(data?.main?.temp_min - 273.15).toFixed(2)}&deg;C |{" "}
                    {(data?.main?.temp_max - 273.15).toFixed(2)}&deg;C
                  </p>

                  <p className="lead">
                Speed: {data?.wind?.speed} | Deg: {data?.wind?.deg} | gust: {data?.wind?.gust}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
