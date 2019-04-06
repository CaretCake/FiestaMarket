import React, { Component } from 'react';
import logo from './logo.svg';
import './assets/styles/App.scss';
import HeaderNav from './Header/HeaderNav/HeaderNav'
import PageFooter from './Footer/PageFooter'

class App extends Component {


  render() {
    return (
      <div className="App">
        <HeaderNav />
        <div class="main">
          <div class="hero">

          </div>
          <div class="container">
            <div class="search">

            </div>
          </div>
        </div>
        <PageFooter />
      </div>
    );
  }
}

export default App;
