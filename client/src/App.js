import React, { Component } from 'react';
import './assets/styles/App.scss';
import { MainApp } from './scenes/export';



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
