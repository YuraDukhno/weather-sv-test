import React from "react";
import { useHistory } from "react-router-dom";
import "../Components/Favorites.css";

export default function Favorites({ favorites, getWeather }) {
  const history = useHistory();

  // ! Handler to put a favorite to homepage.
  const favoriteClickHandler = async favorite => {
    history.push("/");
    await getWeather(favorite);
  };
  return (
    <div className="favorites">
      <div className="container favorites__container">
        <div className="favorites__title">
          <h3 className="title">Favorites</h3>
        </div>
        <div className="cards__wrapper">
          {/* // ! Show cards depending on whether there is a city in favorites. */}
          {/* // ! If there is a favorites. */}
          {favorites.length ? (
            <div className="cards">
              {favorites.map(favorite => (
                <div
                  className="btn"
                  onClick={() => favoriteClickHandler(favorite)}
                >
                  <h5>{favorite.label}</h5>
                  <p>{favorite.currWeather - 32}&deg;</p>
                </div>
              ))}
            </div>
          ) : (
            // ! If not.
            <div className="no-favorites">No favorites added</div>
          )}
        </div>
      </div>
    </div>
  );
}
