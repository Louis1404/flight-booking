import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const state = {
    response: ''
  };

  const handleClick = buttonName => {

    //TODO make a request
    //set the response to the state
  };

  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <p>{this.state.response}</p>
    </div>
  );
}

export default App;
