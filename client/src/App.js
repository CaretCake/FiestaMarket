import React, { Component } from 'react';
import './assets/styles/App.scss';
import HeaderNav from './Header/HeaderNav/HeaderNav';
import MainApp from './Main/MainApp';
import PageFooter from './Footer/PageFooter';



class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    //this.callAPI();
  }

  render() {
    return (
      <div className="App">
        <div class="main">
          <div class="hero">

          </div>
          <div class="container">
            <div class="search">
              <MainApp />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
