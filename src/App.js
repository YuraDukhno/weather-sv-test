import React, { useState, useEffect } from "react";
import { get5dayDailyForecast } from "./API";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import Favorites from "./Components/Favorites";
import HomePage from "./Components/HomePage"
import Header from "./Components/Header";
import "./App.css";
import "weather-icons/css/weather-icons.css";


class App extends React.Component {
  state = {
    daily: [],
    favorites: [],
    currCity: {},
  };

  // ! Get daily forecast when component is mounted.
  componentDidMount() {
    this.getDaily();
  }

  // ! Get daily forecast
  getDaily = async ({ id, label } = { id: "215854", label: "Tel Aviv" }) => {
    const data = await get5dayDailyForecast(id);
    this.setState({
      daily: data.DailyForecasts,
      currCity: { id, label },
    });
  };

  // ! Add to favorite.
  addFavorite = (location, currWeather) => {
    const updatedFavorites = [
      ...this.state.favorites,
      { ...location, currWeather },
    ];
    this.setState({
      favorites: updatedFavorites,
    });
  };

  // ! Remove from favorite.
  removeFavorite = (id) => {
    const updatedFavorites = [...this.state.favorites].filter(
      (favorite) => favorite.id !== id
    );
    this.setState({
      favorites: updatedFavorites,
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                <Route exact path="/">
                  <HomePage
                    daily={this.state.daily}
                    getWeather={this.getDaily}
                    favorites={this.state.favorites}
                    addFavorite={this.addFavorite}
                    removeFavorite={this.removeFavorite}
                    currCity={this.state.currCity}
                  />
                </Route>
                <Route path="/favorites">
                  <Favorites
                    favorites={this.state.favorites}
                    getWeather={this.getDaily}
                  />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
