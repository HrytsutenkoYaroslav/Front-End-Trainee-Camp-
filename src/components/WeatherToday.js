import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './WeatherToday.module.css'; 

const WeatherToday = ({ selectedTrip }) => {
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = '64C2FKRV4QWX62246VMAMRCA7';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${selectedTrip.city}/today?unitGroup=metric&key=${API_KEY}&contentType=json`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (selectedTrip) {
      fetchWeather();
    }
  }, [selectedTrip]);

  
  const getCurrentDayOfWeek = () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    return daysOfWeek[today.getDay()];
  };

  
  const getWeatherIcon = (weatherCondition) => {
    return require(`../png/${weatherCondition}.png`).default; 
  };

  return (
    <div className={styles.weatherContainer}>
      {weatherData ? (
        <div>
          <h2 className={styles.weatherTitle}>{getCurrentDayOfWeek()}</h2>
          <img src={getWeatherIcon(weatherData.currentConditions.icon)} alt="Weather icon" className={styles.weatherIcon} />
          <p className={styles.temperature}>{Math.floor(weatherData.currentConditions.temp)}°C</p>
          <p className={styles.city}>{selectedTrip.city}</p>
          
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherToday;