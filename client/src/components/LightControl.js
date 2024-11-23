// src/LightControl.js
import React, { useState } from 'react';
import './LightControl.css';

const LightControl = () => {
  const [lightStatus, setLightStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleLight = async (status) => {
    setLoading(true);
    setError(null);

    const apiKey = 'UDNHCK0G49JOT10Y';
    const field1 = status ? 1 : 0;
    const url = `https://api.thingspeak.com/update?api_key=${apiKey}&field1=${field1}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setLightStatus(status);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="light-control-container">
      <h1>Light Control</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <button className="on" onClick={() => toggleLight(true)}>Turn On</button>
          <button className="off" onClick={() => toggleLight(false)}>Turn Off</button>
        </>
      )}
      {error && <p className="error">Error: {error}</p>}
      {lightStatus !== null && (
        <p>The light is {lightStatus ? 'On' : 'Off'}</p>
      )}
    </div>
  );
};

export default LightControl;
