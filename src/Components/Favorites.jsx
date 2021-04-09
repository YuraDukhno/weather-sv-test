import React from "react";
import { useHistory } from "react-router-dom";

export default function Favorites({ favorites, getWeather }) {
  const history = useHistory();

  // ! Handler to put a favorite to homepage.
  const favoriteClickHandler = async favorite => {
    history.push("/");
    await getWeather(favorite);
  };
  return (
    <div>
      <h3>Favorites</h3>
      <div className="container-fluid">
        {favorites.length ? (
          <div>
            {favorites.map(favorite => (
              <button onClick={() => favoriteClickHandler(favorite)}>
                <div className="card mb-2">
                  <div className="card-body">
                    <h5 className="card-title">{favorite.label}</h5>
                    <p className="card-text">
                      {favorite.currWeather - 32}&deg;
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div>No favorites added</div>
        )}
      </div>
    </div>
  );
}
