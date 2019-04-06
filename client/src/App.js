import React, { Component } from 'react';
import logo from './logo.svg';
import './assets/styles/App.scss';
import HeaderNav from './Header/HeaderNav/HeaderNav'
import PageFooter from './Footer/PageFooter'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="App">
        <HeaderNav />
        <div class="main">
          <div class="hero">

          </div>
          <div class="container">
            <div class="search">
              <p className="App-intro">{this.state.apiResponse}</p>
            </div>
          </div>
        </div>
        <PageFooter />
      </div>
    );
  }
}

export default App;
