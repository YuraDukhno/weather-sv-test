import axios from "axios";


// ! Key from .env.development
const apiKey = process.env.REACT_APP_API_KEY;

const baseUrl = "http://dataservice.accuweather.com";


// ! Get 5 days forecast.
export async function get5dayDailyForecast(locationKey) {
  try {
    const { data } = await axios.get(
      `${baseUrl}/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`
    );
    return data;
  } catch (e) {
    console.log("e", e);
    throw e;
  }
}

// ! Get default daily forecast.
export async function getCurrWeather(locationKey) {
  try {
    const { data } = await axios.get(
      `${baseUrl}/currentconditions/v1/${locationKey}?apikey=${apiKey}`
    );
    return data;
  } catch (e) {
    console.log("e", e);
    throw e;
  }
}

// ! Get data for autocomplete.
export async function getLocations(query) {
  try {
    const { data } = await axios.get(
      `${baseUrl}/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${query}`
    );
    return { data, query };
  } catch (e) {
    console.log(e);
    throw e;
  }
}
