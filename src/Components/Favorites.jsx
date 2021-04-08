import React from "react";

export default function Favorites() {
  return (
    <div>
      <h3>Favorites</h3>
      <div className="container-fluid">
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
            <p>Tel-Aviv</p>
            <span>35&deg;</span>
          </li>
          <li>
            <p>Los Angeles</p>
            <span>35&deg;</span>
          </li>
          <li>
            <p>Moscow</p>
            <span>35&deg;</span>
          </li>
          <li>
            <p>London</p>
            <span>35&deg;</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
