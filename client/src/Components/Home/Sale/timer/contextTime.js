import React, { createContext, useContext, useState, useEffect } from 'react';

const ContextTimer = createContext();

export const useTimerContext = () => {
  return useContext(ContextTimer);
};

export const TimerProvider = ({ children }) => {
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0});

  useEffect(() => {
    const countdownDate = new Date(); // Set your countdown date here
    countdownDate.setHours(countdownDate.getHours() + 0); // For example, add 1 hour

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(interval);
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const value = {
    timeRemaining,
  };

  return <ContextTimer.Provider value={value}>
    {children}
  </ContextTimer.Provider>;
};
