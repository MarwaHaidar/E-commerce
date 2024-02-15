import React, { useState, useEffect } from 'react';
import './timer.css'
import { useTimerContext } from './contextTime';


function DigitalClock() {
    const { timeRemaining } = useTimerContext();

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
