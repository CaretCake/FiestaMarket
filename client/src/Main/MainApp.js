import React from 'react';

class MainApp extends React.Component {

  constructor() {
    super();
    this.state = {
    };
  }

  render() {

    return (
      <div class="main-app-container">
        <div class="hero-search-section">
          <div class="flex-left"></div>
          <div class="flex-center">
            <div class="search-container">
              <input type="text" placeholder="Search..." />
              <button class="search-button">Search</button>
            </div>
          </div>
          <div class="flex-right"></div>
        </div>
        <div class="content">

        </div>
      </div>
    );
  }

}

export default MainApp;