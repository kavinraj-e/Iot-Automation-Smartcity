// src/App.js
import React from 'react';
import ThingSpeakStatus from './components/ThingSpeakStatus';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>ThingSpeak API Data</h1>
      </header>
      <main>
        <ThingSpeakStatus />
        
      </main>
    </div>
  );
}

export default App;
