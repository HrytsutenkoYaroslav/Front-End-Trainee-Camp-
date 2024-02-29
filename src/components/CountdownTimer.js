import React, { useState, useEffect } from 'react';
import styles from './CountdownTimer.module.css'; // Импорт стилей

const CountdownTimer = ({ startDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(startDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach(interval => {
    if (!timeLeft[interval]) {
      return;
    }

    let intervalText = interval;

    
    if (interval === 'days' && timeLeft[interval] === 1) {
      intervalText = 'day';
    } else if (interval === 'hours' && timeLeft[interval] === 1) {
      intervalText = 'hour';
    } else if (interval === 'minutes' && timeLeft[interval] === 1) {
      intervalText = 'minute';
    } else if (interval === 'seconds' && timeLeft[interval] === 1) {
      intervalText = 'second';
    }

   
    const timeValue = String(timeLeft[interval]).padStart(2, '0');

    timerComponents.push(
      <div className={styles.timerItem} key={interval}>
        <span className={styles.timerValue}>{timeValue}</span>
        <span className={styles.timerText}>{intervalText}</span>
      </div>
    );
  });

  return (
    <div className={styles.countdownContainer}>
      {timerComponents.length ? timerComponents : <span className={styles.timerText}>Time's up!</span>}
    </div>
  );
};

export default CountdownTimer;