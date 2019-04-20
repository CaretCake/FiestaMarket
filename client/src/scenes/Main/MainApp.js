import React from 'react';
import { itemService } from "../../services/item.service";

export  class MainApp extends React.Component {

  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);

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
      } else if (this.state.query.length === 0) {
        this.setState({results: []});
      }
    });
  }

  routeChange(path) {
    console.log(JSON.stringify(path));
    this.props.history.push(path);
  }

  render() {
    return (
      <div class='main-app-container'>
        <div class='hero-search-section'>
          <div class='flex-left'/>
          <div class='flex-center'>
            <div class='search-container'>
              <form>
                <input placeholder='Search...' name='term' ref={input => this.search = input} onChange={this.handleInputChange} autoComplete="off" />
                <button onClick={() => this.routeChange( '/items/' + (this.state.results[0] !== null ? ((this.state.results[0]).ItemId) : ''))} className='search-button' type="button">Search</button>
              </form>
              <div className='search-dropdown'>
                <ul>
                  {this.state.results.map(item => (
                    <li key={item.itemId} unselectable="on" class="unselectable">{item.ItemName}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div class='flex-right'/>
        </div>
        <div class='content'>
          <ul>

          </ul>
        </div>
      </div>
    );
  }

}