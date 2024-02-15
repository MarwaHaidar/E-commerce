import React, { useState, useEffect } from 'react';
import './timer.css'



function DigitalClock() {
    const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const countdownDate = new Date(); // Set your countdown date here
        countdownDate.setHours(countdownDate.getHours() + 26); // For example, add 1 hour

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

    return (
        <div className='saleheader'>
            <div>
                <p className='txt'>Flash Sale</p>
            </div>
            <div className="digital-clock">
                <div className="time">
                    <div className="time-unit">
                        <span className="label">Days</span>
                        <span>{timeRemaining.days.toString().padStart(2, '0')}</span>
                    </div>
                    <div className="time-unit">
                        <span className="label">Hours</span>
                        <span>{timeRemaining.hours.toString().padStart(2, '0')}</span>
                    </div>
                    <div className="time-unit">
                        <span className="label">Minutes</span>
                        <span>{timeRemaining.minutes.toString().padStart(2, '0')}</span>
                    </div>
                    <div className="time-unit">
                        <span className="label">Seconds</span>
                        <span>{timeRemaining.seconds.toString().padStart(2, '0')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DigitalClock;
