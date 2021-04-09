import React, { useState } from "react";
import Autocomplete from "./UI/Autocomplete";
import { getLocations } from "../API";

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

    // ! if input in not empty.
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
    <div>
      <main className="container-fluid">
        <div className="row">
          <div className="col">
            <Autocomplete
              placeholder="Type location"
              onKeyDown={locationSearchHandler}
              options={cities}
              onSelect={({ value, label }) => {
                getWeather({ id: value, label });
              }}
            />
          </div>
          <div className="col">
            <div className="">
              {/* // ! Show buttons depending on whether there is a city in favorites. */}
              {/* // ! Remove if there is */}
              {favorites.some(favorite => favorite.id === currCity.id) ? (
                <button
                  type="submit"
                  className="btn btn-danger"
                  style={{ margin: "2px" }}
                  onClick={() => removeFavorite(currCity.id)}
                >
                  Remove from favorites
                </button>
              ) : (
                // ! Add if there is not.
                <button
                  type="submit"
                  className="btn btn-success"
                  style={{ margin: "2px" }}
                  onClick={() =>
                    addFavorite(
                      currCity,
                      todaysForecast.Temperature.Maximum.Value
                    )
                  }
                >
                  Add to favorites
                </button>
              )}
            </div>
          </div>
        </div>
        <div
          className="cards"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "10px",
            padding: "10px",
          }}
        >
          {/* // !  TODAY FORECAST */}
          {todaysForecast && currCity && (
            <React.Fragment>
              <h2>{currCity.label}</h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  boxShadow: "2px 2px 10px",
                  margin: "10px",
                  padding: "5px",
                  borderRadius: "10px",
                }}
              >
                <h3 style={{ padding: "2.5px" }}>
                  Max: {todaysForecast.Temperature.Maximum.Value - 32}&deg;
                </h3>
                <h3 style={{ padding: "2.5px" }}>
                  Min: {todaysForecast.Temperature.Minimum.Value - 32}&deg;
                </h3>
              </div>
              <h4>Day: {todaysForecast.Day.IconPhrase}</h4>
              <h4>Night: {todaysForecast.Night.IconPhrase}</h4>
            </React.Fragment>
          )}
        </div>
        <div>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              justifyContent: "space-around",
              margin: "0",
              padding: "0",
            }}
          >
            {daily.map(item => {
              const { Temperature, Date } = item;
              return (
                <li style={{ textAlign: "center", padding: "5px" }}>
                  <p>{Date.slice(0, 10)}</p>
                  <span>Max: {Temperature.Maximum.Value - 32}&deg;</span>
                  <br />
                  <span>Min: {Temperature.Minimum.Value - 32}&deg;</span>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </div>
  );
}
