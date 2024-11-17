import React, { useState } from "react";
import { getCurrentWeather } from "./api/weatherAPI";

interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    humidity: number;
    feelslike_c: number;
    feelslike_f: number;
    pressure_mb: number;
    vis_km: number;
  };
}

const App: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isCelsius, setIsCelsius] = useState<boolean>(true); // Celsius by default

  const handleFetchWeather = async (cityName: string) => {
    if (!cityName.trim()) {
      setError("Please enter a valid city name.");
      return;
    }

    setLoading(true);
    try {
      const data = await getCurrentWeather(cityName);
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch weather data. Please check your city name or try again later.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFetchWeather(city);
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500" data-theme="winter">
      <h1 className="text-5xl font-extrabold text-center text-white mb-8">Weather Finder</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mb-8 bg-white p-6 rounded-lg shadow-xl">
        <div className="mb-6">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          Search
        </button>
      </form>

      {loading && (
        <div className="flex justify-center items-center mb-8">
          <div className="spinner border-t-4 border-blue-600 w-16 h-16 rounded-full animate-spin"></div>
        </div>
      )}

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {weatherData && (
        <div className="w-full max-w-lg mx-auto p-8 bg-white rounded-lg shadow-2xl">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
            {weatherData.location.name}, {weatherData.location.country}
          </h2>
          <div className="flex justify-center mb-4">
            <img
              src={weatherData.current.condition.icon}
              alt={weatherData.current.condition.text}
              className="w-20 h-20"
            />
          </div>
          <div className="text-center text-lg text-gray-700">
            <p className="mb-2">
              <span className="font-semibold">Temperature:</span> 
              {isCelsius ? `${weatherData.current.temp_c}°C` : `${weatherData.current.temp_f}°F`}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Feels Like:</span> 
              {isCelsius ? `${weatherData.current.feelslike_c}°C` : `${weatherData.current.feelslike_f}°F`}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Humidity:</span> {weatherData.current.humidity}%
            </p>
            <p className="mb-2">
              <span className="font-semibold">Wind Speed:</span> {weatherData.current.wind_kph} km/h
            </p>
            <p className="mb-2">
              <span className="font-semibold">Pressure:</span> {weatherData.current.pressure_mb} mb
            </p>
            <p className="mb-2">
              <span className="font-semibold">Visibility:</span> {weatherData.current.vis_km} km
            </p>
            <button
              onClick={toggleTemperatureUnit}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none"
            >
              Switch to {isCelsius ? "°F" : "°C"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
