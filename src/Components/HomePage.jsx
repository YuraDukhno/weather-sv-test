import axios from "axios";
import React, { useState } from "react";

// const getDaily = () => {
//   axios
//     .get(
//       `http://dataservice.accuweather.com/forecasts/v1/daily/5day/215854?apikey=fm9yiw3gGHqjNhoiPGZFRUYg6HDT4XmD`
//     )
//     .then(res => {
//       const data = res.data;
//       return data.DailyForecasts;
//     });
// };

export default function HomePage(props) {
  const [cities, setCities] = useState([]);
  const [input, setInput] = useState("Tel Aviv");
  const [key, setKey] = useState("");

  const inputHandler = item => {
    setInput(item.target.value);
  };

  // const getCity = key => {
  //   axios
  //     .get(
  //       `http://dataservice.accuweather.com/locations/v1/${key}?apikey=fm9yiw3gGHqjNhoiPGZFRUYg6HDT4XmD`
  //     )
  //     .then(res => {
  //       const data = res.data;
  //       console.log(data);
  //     });
  // };

  // ! Load data for datalist.
  React.useEffect(() => {
    // debugger;
    axios
      .get(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=fm9yiw3gGHqjNhoiPGZFRUYg6HDT4XmD&q=${input}`
      )
      .then(res => {
        const data = res.data;
        let cities = [];
        for (let i = 0; i < data.length; i++) {
          cities.push(data[i]);
        }
        setCities(cities);
        setKey(cities[0].Key);
      });
  });

  return (
    <div>
      <main className="container-fluid">
        <div class="row">
          <div class="col">
            <input
              onChange={inputHandler}
              type="search"
              className="form-control"
              placeholder="Type location"
              list="cities"
            />
            <datalist type="text" id="cities">
              {cities.map(item => {
                return <option>{`${item.LocalizedName}`}</option>;
              })}
            </datalist>
          </div>
          <div class="col">
            <div class="col-12" style={{ display: "flex" }}>
              <button
                type="submit"
                class="btn btn-primary"
                style={{ margin: "2px" }}
              >
                Add to favorites
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                style={{ margin: "2px" }}
              >
                Remove from favorites
              </button>
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
          <h3>{}</h3>
          <h4>35&deg;</h4>
          <i
            className="wi wi-day-sunny display-1"
            style={{ margin: "15px" }}
          ></i>
          <p>Scattered Clouds</p>
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
            {props.daily.map(item => {
              const { Temperature, Date } = item;
              return (
                <li style={{ textAlign: "center", padding: "5px" }}>
                  <p>{Date}</p>
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
