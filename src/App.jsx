import React from 'react';
import './App.css';
import Weather from './Weather';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='text-4xl text-red-500'>Weather App</h1>
      </header>
      <main>
        <Weather />
      </main>
    </div>
  );
}

export default App;
