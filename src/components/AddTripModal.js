import React, { useState } from 'react';
import styles from './AddTripModal.module.css';
import cities from './citiesData'; 

const AddTripModal = ({ isOpen, closeModal, addTrip }) => {
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  
  const getNextFifteenDays = () => {
    const today = new Date();
    const nextFifteenDays = new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000);
    return nextFifteenDays.toISOString().split('T')[0];
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = () => {
    if (!city || !startDate || !endDate) {
      alert('Please fill in all fields');
      return;
    }

    const trip = {
      id: Date.now(),
      city: city,
      startDate: startDate,
      endDate: endDate
    };

    addTrip(trip);
    setCity('');
    setStartDate('');
    setEndDate('');
  };

  return (
    isOpen && (
      <div className={styles.modalOverlay}>
        <div className={styles.addTripModal}>
          <button className={styles.closeButton} onClick={closeModal}>X</button>
          <h2 className={styles.inputh2}>Create trip</h2>
          <div className={styles.Container3}>
            <div className={styles.inputContainer}>
              <label htmlFor="city">City:</label>
              <select id="city" value={city} onChange={handleCityChange}>
                <option value="">Please select a city</option>
                {cities.map(city => (
                  <option key={city.id} value={city.name}>{city.name}</option>
                ))}
              </select>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="startDate">Start Date:</label>
              <input type="date" id="startDate" value={startDate || ''} onChange={handleStartDateChange} min={new Date().toISOString().split('T')[0]} max={endDate || getNextFifteenDays()} />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="endDate">End Date:</label>
              <input type="date" id="endDate" value={endDate || ''} onChange={handleEndDateChange} min={startDate} max={getNextFifteenDays()} />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.cancelButton} onClick={closeModal}>Cancel</button>
            <button className={styles.saveButton} onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    )
  );
};

export default AddTripModal;