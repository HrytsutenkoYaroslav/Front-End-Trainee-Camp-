import React from 'react';
import styles from './Trip.module.css';
import cities from './citiesData'; 

const Trip = ({ trip, selectTrip }) => {
  const cityData = cities.find(city => city.name === trip.city); 
  const cityImage = cityData ? cityData.image : ''; 

  const handleClick = () => {
    selectTrip(trip);
  };

  return (
    <div className={styles.trip} tabIndex="0" onClick={handleClick}>
      {cityImage && <img src={cityImage} alt={trip.city} className={styles.cityImage} />} 
      <div className={styles.textContainer}>
        <h3>{trip.city}</h3>
        <p>{trip.startDate} - {trip.endDate}</p>
      </div>
    </div>
  );
};

export default Trip;