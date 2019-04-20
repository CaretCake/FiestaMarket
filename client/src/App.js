import React, { Component } from 'react';
import './assets/styles/App.scss';
import { MainApp } from './scenes/export';



class App extends Component {
  render() {
    return (
      <div className="App">
        <MainApp />
      </div>
    );
  }
}

export default App;
