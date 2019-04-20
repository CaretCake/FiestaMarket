import React from 'react';
import axios from 'axios';
import { itemService } from "../../services/item.service";

export class MainApp extends React.Component {

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
      if (this.state.query && this.state.query.length > 0) {
        itemService.getByFilters(this.state.query)
          .then(results => {
            this.setState({results: results.data});
          });
      }
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
          <div class="flex-left"/>
          <div class="flex-center">
            <div class="search-container">
              <form>
                <input placeholder="Search..." name="term" ref={input => this.search = input} onChange={this.handleInputChange} />
                <button className="search-button">Search</button>
              </form>
            </div>
          </div>
          <div class="flex-right"/>
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