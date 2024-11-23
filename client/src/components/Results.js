// src/ThingSpeakFeeds.js
import React, { useEffect, useState } from 'react';
import './ThingSpeakFeeds.css';

const  Results = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.thingspeak.com/channels/2563854/feeds.json?results');
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
    <div className="feeds-container">
      <h1>Led ON and Off Results</h1>
      <table>
        <thead>
          <tr>
            <th>Entry ID</th>
            <th>Created At</th>
            <th>Field 1</th>
            <th>Field 2</th>
            <th>Field 3</th>
          </tr>
        </thead>
        <tbody>
          {data.feeds.map(feed => (
            <tr key={feed.entry_id}>
              <td>{feed.entry_id}</td>
              <td>{new Date(feed.created_at).toLocaleString()}</td>
              <td>{feed.field1 || 'N/A'}</td>
              <td>{feed.field2 || 'N/A'}</td>
              <td>{feed.field3 || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <iframe width="450" height="260" title='led1' style={{border: "1px solid #cccccc"}} src="https://thingspeak.com/channels/2563854/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"></iframe>
      <iframe width="450" height="260" title='led2' style={{border: "1px solid #cccccc"}} src="https://thingspeak.com/channels/2563854/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"></iframe>
      <iframe width="450" height="260" title='led3' style={{border: "1px solid #cccccc"}} src="https://thingspeak.com/channels/2563854/charts/3?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"></iframe> */}

    </div>
  );
};

export default Results;
