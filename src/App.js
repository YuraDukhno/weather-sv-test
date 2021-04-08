import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Favorites from "./Components/Favorites";
import "./App.css";
import HomePage from "./Components/HomePage";
import "weather-icons/css/weather-icons.css";
import axios from "axios";

const api = "fm9yiw3gGHqjNhoiPGZFRUYg6HDT4XmD";

 class App extends React.Component {
   constructor() {
     super();
   }

   state = {
     daily: [],
   };

   componentDidMount() {
     this.getDaily();
   }

   getDaily = async () => {
     const api_call = await fetch(
       `http://dataservice.accuweather.com/forecasts/v1/daily/5day/215854?apikey=fm9yiw3gGHqjNhoiPGZFRUYg6HDT4XmD`
     );

     const response = await api_call.json();
      
     this.setState({
       daily: response.DailyForecasts,
     });

   };

   render() {
     return (
       <Router>
         <div className="App">
           <nav className="navbar navbar-expand-lg navbar-light fixed-top">
             <div className="container">
               <Link className="navbar-brand" to={"/HomePage"}>
                 Weather App
               </Link>
               <div
                 className="collapse navbar-collapse"
                 id="navbarTogglerDemo02"
               >
                 <ul className="navbar-nav ml-auto">
                   <li className="nav-item">
                     <Link className="nav-link" to={"/HomePage"}>
                       Home
                     </Link>
                   </li>
                   <li className="nav-item">
                     <Link className="nav-link" to={"/Favorites"}>
                       Favorites
                     </Link>
                   </li>
                 </ul>
               </div>
             </div>
           </nav>

           <div className="auth-wrapper">
             <div className="auth-inner">
               <Switch>
                 <Route
                   exact
                   path="/"
                   component={() => <HomePage daily={this.state.daily} />}
                 />
                 <Route path="/favorites" component={Favorites} />
               </Switch>
             </div>
           </div>
         </div>
       </Router>
     );
   }
 }

 export default App;