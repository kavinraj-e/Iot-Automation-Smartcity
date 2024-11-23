// src/ThingSpeakStatus.js
import React, { useEffect, useState } from 'react';
import './ThingSpeakStatus.css';
import Results from './Results';
import LightControl from './LightControl';


const ThingSpeakStatus = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.thingspeak.com/channels/2563854/status.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
    <LightControl/>
    <div className="status-container">
      <h1>LED LIGHT STATUS</h1>
      <table>
        <thead>
          <tr>
            <th>Entry ID</th>
            <th>Created At</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.feeds.map(feed => (
            <tr key={feed.entry_id}>
              <td>{feed.entry_id}</td>
              <td>{new Date(feed.created_at).toLocaleString()}</td>
              <td>{feed.status || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
     <Results/>
   </>
  );
};

export default ThingSpeakStatus;
