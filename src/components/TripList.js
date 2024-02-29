import React from 'react';
import Trip from './Trip';
import styles from './TripList.module.css';

const TripList = ({ trips, setTrips, selectTrip, openModal }) => {
  const tripsPerPage = 5;

  const handleTripClick = (trip) => {
    selectTrip(trip);
  };

  return (
    <div className={styles.tripListContainer}>
      <div className={styles.tripContainer}>
        {trips.slice(0, tripsPerPage).map(trip => (
          <Trip key={trip.id} trip={trip} selectTrip={handleTripClick} />
        ))}
        <div className={styles.addTripButtonContainer}>
          <button className={styles.addButton} onClick={openModal}>
            <div className={styles.addButtonContent}>
              <span>+</span> 
            </div>
            <div className={styles.addTripText}>Add Trip</div> 
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripList;