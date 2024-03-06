import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ endDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(endDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
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
    }, [timeLeft]);

    const formatTime = time => time.toString().padStart(2, '0');

    return (
     
          <>
          {formatTime(timeLeft.days || 0)}D : 
                {formatTime(timeLeft.hours || 0)}H : 
                {formatTime(timeLeft.minutes || 0)}M : 
                {formatTime(timeLeft.seconds || 0)}S
          </>
                
            
    );
};

export default CountdownTimer;