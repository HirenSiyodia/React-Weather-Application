import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

 const fetchWeatherData = async () => {
  if (!city) {
    alert("Enter city name")
    return
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=792f2885fd2f08a9e9f3e4c7c28a3719`
    )
    setWeatherData(response.data)

  } catch (error) {
    console.log('Error occurred', error)
  }
}

  const handleChange = () => {
    fetchWeatherData()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
      🌤️ Weather App
        </h1>
    <div className="flex items-center gap-2">      
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        type="text"
        placeholder="Enter city name..."
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
      onClick={handleChange} 
      className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
        Search
      </button>
    </div>
    {weatherData && (
      <div className="mt-6 bg-gray-100 rounded-lg p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{weatherData.name}</h2>
        <p className="text-gray-700 mb-1">Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
        <p className="text-gray-700 mb-1">Humidity: {weatherData.main.humidity}%</p>
        <p className="text-gray-700 mb-1">Weather: {weatherData.weather[0].description}</p>
      </div>
    )}
  </div>
</div>
  )
}

export default Weather
