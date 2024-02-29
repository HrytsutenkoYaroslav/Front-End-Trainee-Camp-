import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './TripForecast.module.css';

const getDayOfWeek = (dateString) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(dateString);
  return daysOfWeek[date.getDay()];
};

const getWeatherIcon = (weatherCondition) => {
  return require(`../png/${weatherCondition}.png`).default;
};

const TripForecast = ({ trip }) => {
  const [forecast, setForecast] = useState([]);
  const API_KEY = '64C2FKRV4QWX62246VMAMRCA7';

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${trip.city}/${trip.startDate}/${trip.endDate}?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`
        );
        setForecast(response.data.days);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      }
    };

    fetchForecast();
  }, [trip]);

 
  const endDateOfWeek = new Date(trip.startDate);
  endDateOfWeek.setDate(endDateOfWeek.getDate() + 6);

  
  const filteredForecast = forecast.filter(day => new Date(day.datetime) <= endDateOfWeek);

  return (
    <div className={styles.forecastContainer}>
      {filteredForecast.map(day => (
        <div key={day.datetime} className={styles.dayContainer}>
          <p>{getDayOfWeek(day.datetime)}</p>
          <img src={getWeatherIcon(day.icon)} alt="Weather icon" />
          <p>{Math.floor(day.tempmin)}°C/{Math.floor(day.tempmax)}°C</p>
        </div>
      ))}
    </div>
  );
};

export default TripForecast;