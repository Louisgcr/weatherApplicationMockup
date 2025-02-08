import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from 'axios';

import { IWeatherAPIResponse, ILocationsResponse } from 'interface';

import Home from 'pages/Home';

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage for user's theme preference
    return localStorage.getItem('theme') === 'dark' || false;
  });

  const [backgroundImageUrl, setBackgroundImageUrl] = useState('/bg-light.png');
  const [weather, setWeather] = useState<IWeatherAPIResponse | null>(null);
  const [locationsHistory, setLocationsHistory] = useState<ILocationsResponse[]>([]);

  //Helper function to fetch lat lon from user computer
  const fetchWeatherFromLatLon = async (lat: number, lon: number) => {
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );

      if (!weatherResponse.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await weatherResponse.json();
      setWeather(data);

    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("An unknown error occurred");
      }
    }
  }
  //Fetch initial location from browser
  useEffect(() => {
    const fetchLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const data = await fetchWeatherFromLatLon(position.coords.latitude, position.coords.longitude);
            } catch (err) {
              if (err instanceof Error) {
                console.log(err.message);
              } else {
                console.log("An unknown error occurred");
              }
            }
          },
          (error) => {
            if (error.message === "User denied Geolocation") {
              console.log("User denied Geolocation");
            } else {
              console.log("An unknown error occurred");
            }
          }
        );
      }
    };

    fetchLocation();
  }, []);

  //Set theme based on user's preference
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setBackgroundImageUrl('/bg-dark.png');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setBackgroundImageUrl('/bg-light.png');
    }
  }, [darkMode]);

  //Helper function to fetch all history locations
  const getAllLocationFrom = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/locations`);
      setLocationsHistory(response.data);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("An unknown error occurred");
      }
    }
  }

  useEffect(() => {
    getAllLocationFrom();
  }, [weather]);

  return (
    <Router>
      <div className='relative'>
        {/* Background image */}
        <div
          className={`fixed inset-0 min-h-screen bg-cover bg-center blur-sm -z-10`}
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
          }}
        />

        {/* Toggle button for dark and light theme */}
        <button onClick={() => { setDarkMode((prev) => !prev) }}
          className='absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 text-white font-bold p-2.5 z-20 rounded-full'>
          {darkMode ? "☀️" : "🌙"}
        </button>

        <Routes>
          <Route path="/"
            element={
              <Home weather={weather} setWeather={setWeather} locationsHistory={locationsHistory} setLocationsHistory={setLocationsHistory} />
            }
          />

        </Routes>
      </div>
    </Router>
  )
}

export default App