import React, { Component } from 'react';
import { MainApp } from './scenes/export';



class App extends Component {
  render() {
    return (
      <div className="App">
        <MainApp history={this.props.history} />
      </div>
    );
  }
}

export default App;
