import React from "react";
import { Link } from "react-router-dom";
import "../Header/index.css";

const Header = () => {
  return (
    <header className="header">
      <div className="container header__container">
        <div className="logo">
          <h1 className="capture">
            <Link to={"/"}>Weather App</Link>
          </h1>
        </div>
        <nav className="navbar">
          <ul className="nav__list">
            <li className="nav__item">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="nav__item">
              <Link to={"/favorites"}>Favorites</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
