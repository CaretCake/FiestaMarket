import React from 'react';
import axios from 'axios';

class MainApp extends React.Component {

  constructor() {
    super();
    this.state = {
      query: '',
      results: []
    };
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
          this.getInfo()
      } else if (!this.state.query) {}
    });
  }

  getInfo = () => {
    axios.get(`http://localhost:9000/items/search?&term=${this.state.query}`)
      .then(({ data }) => {
        this.setState({
          results: data
        })
      })
      .catch(err => console.log(err));
  }

  render() {

    return (
      <div class="main-app-container">
        <div class="hero-search-section">
          <div class="flex-left"></div>
          <div class="flex-center">
            <div class="search-container">
              <form>
                <input placeholder="Search..." name="term" ref={input => this.search = input} onChange={this.handleInputChange} />
                <button className="search-button">Search</button>
              </form>
            </div>
          </div>
          <div class="flex-right"></div>
        </div>
        <div class="content">
          <ul>
            {this.state.results.map(item => (
              <li key={item.itemId}>{item.ItemName}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

}

export default MainApp;