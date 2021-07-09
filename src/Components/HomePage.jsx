import React, { useState } from "react";
import Autocomplete from "./UI/Autocomplete";
import { getLocations } from "../API";
import "../Components/HomePage.css";

export default function HomePage({
  // ! props
  daily,
  getWeather,
  favorites,
  addFavorite,
  removeFavorite,
  currCity,
}) {
  const [cities, setCities] = useState([]);
  const [input, setInput] = useState();

  const [todaysForecast] = daily;

  // ! Handler for search.
  const locationSearchHandler = async e => {
    const { value } = e.target;
    setInput(value);

    // ! if input is not empty.
    if (value.trim()) {
      const response = await getLocations(value);
      // ! if response successful.
      if (response) {
        setCities(
          response.data.map(location => ({
            value: location.Key,
            label: location.LocalizedName,
          }))
        );
      }
    }
  };

  return (
    <main className="main">
      <div className="main__container container">
        <div className="auto-complete__wrapper">
          <div className="auto-complete">
            <Autocomplete
              placeholder="Type location"
              onKeyDown={locationSearchHandler}
              options={cities}
              // ! getDaily from app.
              onSelect={({ value, label }) => {
                getWeather({ id: value, label });
              }}
            />
          </div>

          <div className="auto-complete__buttons">
            <div>
              {/* // ! Show buttons depending on whether there is a city in favorites. */}
              {/* // ! Remove if there is */}
              {favorites.some(favorite => favorite.id === currCity.id) ? (
                <div
                  className="btn"
                  type="submit"
                  onClick={() => removeFavorite(currCity.id)}
                >
                  Remove From Favorites
                </div>
              ) : (
                // ! Add if there is not.
                <div
                  className="btn"
                  type="submit"
                  onClick={() =>
                    addFavorite(
                      currCity,
                      todaysForecast.Temperature.Maximum.Value
                    )
                  }
                >
                  Add to favorites
                </div>
              )}
            </div>
          </div>
        </div>

        <ul className="current-weather">
          {/* // !  TODAY FORECAST */}
          {todaysForecast && currCity && (
            <React.Fragment>
              <li className="current-weather-item">
                <h2>{currCity.label}</h2>
              </li>
              <li className="current-weather-item">
                <div className="degrees">
                  <span className="degrees-max">
                    Max: {todaysForecast.Temperature.Maximum.Value - 32}&deg;
                  </span>
                  <span className="degrees-min">
                    Min: {todaysForecast.Temperature.Minimum.Value - 32}&deg;
                  </span>
                </div>
              </li>
              <li className="current-weather-item">
                <span>Day: {todaysForecast.Day.IconPhrase}</span>
              </li>
              <li className="current-weather-item">
                <span>Night: {todaysForecast.Night.IconPhrase}</span>
              </li>
            </React.Fragment>
          )}
        </ul>

        <div className="five-days-weather__wrapper">
          <ul className="five-days-weather__list">
            {daily.map(item => {
              const { Temperature, Date } = item;
              return (
                <li className="five-days__item">
                  <p>{Date.slice(0, 10)}</p>
                  <span>Max: {Temperature.Maximum.Value - 32}&deg;</span>
                  <br />
                  <span>Min: {Temperature.Minimum.Value - 32}&deg;</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}
