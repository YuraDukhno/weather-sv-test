import axios from "axios";
import React, { useState } from "react";

export default function HomePage(props) {
  const [cities, setCities] = useState([]);
  const [input, setInput] = useState("Tel Aviv");
  const [key, setKey] = useState("");

  const inputHandler = item => {
    setInput(item.target.value);
  };

  // const getCity = () => {
  //   let city = cities.filter(item => )
  // };

  // ! Load data for datalist.
  React.useEffect(() => {
    // debugger;
    axios
      .get(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=ETvbQQgXbrE05zk9PCYq6zMGSL89MZe5&q=${input}`
      )
      .then(res => {
        const data = res.data;
        let cities = [];
        for (let i = 0; i < data.length; i++) {
          cities.push(data[i]);
        }
        setCities(cities);
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
              class="form-control"
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
          <h3>{input}</h3>
          <h4>35&deg;</h4>
          <i class="wi wi-day-sunny display-1" style={{ margin: "15px" }}></i>
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
            <li>
              <p>Sun</p>
              <span>35&deg;</span>
            </li>
            <li>
              <p>Mon</p>
              <span>35&deg;</span>
            </li>
            <li>
              <p>Tue</p>
              <span>35&deg;</span>
            </li>
            <li>
              <p>Wed</p>
              <span>35&deg;</span>
            </li>
            <li>
              <p>Tue</p>
              <span>35&deg;</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
