import React, { Component } from 'react';
import './assets/styles/App.scss';
import { MainApp } from './scenes/export';
import { authenticationService } from './services/export';
import { Role } from './helpers/export';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isAdmin: false
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x => {
      console.log('x: ' + JSON.stringify(x));
      this.setState({
      currentUser: x,
      isAdmin: x && x.role === Role.Admin
    })});
  }

  render() {
    const { currentUser, isAdmin } = this.state;

    return (
      <div className="App">
        { currentUser && <p>logged in!</p>}
        <MainApp />
      </div>
    );
  }
}

export default App;
