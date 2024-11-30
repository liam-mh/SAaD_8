import React, { useState } from 'react';
import Countdown from 'react-countdown';

const CountdownTimer = ({ length }) => {
    const timerEnd = Date.now() + length * 60 * 1000;
    const [isTimeUp, setIsTimeUp] = useState(false);

    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            setIsTimeUp(true);
            return <p>Time's up!</p>;
        } else {
            return (
                <h4 style={{ display: 'inline' }}>
                    Media reserved for: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </h4>
            );
        }
    };

    return (
        <>
            <Countdown 
                date={timerEnd}  
                renderer={renderer} 
            />
            {isTimeUp && <p>The timer has ended!</p>}
        </>
    );
};

export default CountdownTimer;