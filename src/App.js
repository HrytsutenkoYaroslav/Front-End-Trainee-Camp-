import React, { useState, useEffect } from 'react';
import TripList from './components/TripList';
import TripForecast from './components/TripForecast';
import AddTripModal from './components/AddTripModal';
import WeatherToday from './components/WeatherToday';
import CountdownTimer from './components/CountdownTimer';
import styles from './App.module.css';
import SearchInput from './components/SearchInput';

const App = () => {
  const [trips, setTrips] = useState([
    { id: 1, city: 'New York', startDate: '2024-03-01', endDate: '2024-03-07' }
  ]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWeatherVisible, setIsWeatherVisible] = useState(false);
  const [isCountdownVisible, setIsCountdownVisible] = useState(false);
  const [ setSearchTerm] = useState('');

  useEffect(() => {
    if (trips.length > 0) {
      setSelectedTrip(trips[0]); 
    }
  }, [trips]);

  const selectTrip = (trip) => {
    setSelectedTrip(trip);
    setIsWeatherVisible(true); 
    setIsCountdownVisible(true); 
  };

  const addTrip = (trip) => {
    setTrips([...trips, trip]);
    closeModal();
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filtered = trips.filter(trip => trip.city.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredTrips(filtered);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.app}>
      
      <div className={styles.content}>
        <div className={styles.leftContent}>
        <h1 className={styles.span}>
        Weather <span className={styles.span1}>Forecast</span>
      </h1>
      <SearchInput onSearch={handleSearch} />
          <TripList trips={filteredTrips.length ? filteredTrips : trips} setTrips={setTrips} selectTrip={selectTrip} openModal={openModal} />
          {selectedTrip && (
            <div className={styles.forecastContainer}>
              <h2 className={styles.h2}>Week</h2>
              <TripForecast trip={selectedTrip} />
            </div>
          )}
        </div>
        <div className={styles.rightContent}>
          {isWeatherVisible && selectedTrip && <WeatherToday selectedTrip={selectedTrip} />}
          {isCountdownVisible && selectedTrip && <CountdownTimer startDate={selectedTrip.startDate} />}
        </div>
      </div>
      <AddTripModal isOpen={isModalOpen} closeModal={closeModal} addTrip={addTrip} />
    </div>
  );
};

export default App;