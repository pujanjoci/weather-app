import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherApp() {
    const [location, setLocation] = useState('');
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

      useEffect(() => {
        fetchWeatherData('Kathmandu');
    }, []);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const fetchWeatherData = async (city) => {
        setLoading(true);
        setError(null);
        try {
            // Fetch current weather
            const currentResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            setCurrentWeather(currentResponse.data);

            // Fetch forecast
            const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
            setForecast(forecastResponse.data.list.slice(0, 5));
            
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch weather data. Please try again.');
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (location.trim()) {
            fetchWeatherData(location);
            setLocation('');
        }
    };

return (
    <div className="flex flex-col items-center p-5 md:p-4">
        <header className="w-[300px] mb-4 flex flex-col md:flex-row justify-between items-center bg-blue-500 text-white p-2 ml-[-30px] mb:p-3 rounded-lg">
            <div className="flex w-full space-x-2">
                <input
                    type="text"
                    placeholder="Search for a city..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full md:w-auto bg-white text-gray-700 p-2 rounded"
                />
                <button
                    onClick={handleSearch}
                    className="w-full md:w-auto bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200"
                >
                    Search
                </button>
            </div>
        </header>

        {loading && <div className="text-blue-500">Loading...</div>}

        {error && <div className="text-red-500 font-bold">{error}</div>}

        {currentWeather && (
            <div className="w-full bg-gray-700 p-4 rounded-lg shadow-lg ml-[-30px] mb-4">
                <h2 className="text-xl font-bold mb-2">{currentWeather.name}, {currentWeather.sys.country}</h2>
                <div className="flex flex-col items-center">
                    <p className="text-lg font-bold">{currentWeather.main.temp}°C</p>
                    <p className="capitalize">{currentWeather.weather[0].description}</p>
                </div>
            </div>
        )}

        {forecast && (
            <div className="w-full bg-gray-700 p-7 ml-[-30px] rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-2">5-Day Forecast</h3>
                <div className="flex flex-col space-y-2">
                    {forecast.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
                            <p>{item.main.temp}°C</p>
                            <p className="capitalize">{item.weather[0].description}</p>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
);

}   

export default WeatherApp;