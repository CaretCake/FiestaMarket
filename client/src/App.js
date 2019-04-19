import React, { Component } from 'react';
import './assets/styles/App.scss';
import { MainApp } from './scenes/export';
import { authenticationService } from './services/export';
import { Role } from './helpers/export';



class App extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="App">
        <MainApp />
      </div>
    );
  }
}

export default App;
