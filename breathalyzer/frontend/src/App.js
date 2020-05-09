import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

function App() {
    const handleClick = async () => {
      const  helloResponce = await axios.get('/api/');
      console.log(helloResponce);
    };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit to reload -> XD )
        </p>
          <div>
              <button onClick={handleClick}> Send Request to backend</button>
          </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React[
        </a>
      </header>
    </div>
  );
}

export default App;
