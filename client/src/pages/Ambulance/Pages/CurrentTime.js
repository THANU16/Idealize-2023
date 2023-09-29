import React, { useState, useEffect } from 'react';
import moment from 'moment';

function CurrentTime(props) {
  const [currentTime, setCurrentTime] = useState(moment().format('HH:mm:ss'));

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the time every 1 second
      setCurrentTime(moment().format('HH:mm:ss'));
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return <h4>{CurrentTime}</h4>;
}

export default CurrentTime;
