import React from 'react';
import { itemService } from "../../services/item.service";

export  class MainApp extends React.Component {

  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
    this.validResult = this.validResult.bind(this);

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
  };

  handleItemClick(itemId, itemName) {
    this.setState({query: itemName});
    this.routeChange( '/items/' + itemId);
  }

  routeChange(path) {
    console.log(JSON.stringify(path));
    this.props.history.push(path);
  }

  validResult() {
    return (this.state.results[0] !== null && this.state.results[0] !== [] && this.state.results[0] !== undefined && (this.state.results[0]).ItemId !== '');
  }

  render() {
    return (
      <div className='main-app-container'>
        <div className='hero-search-section flex-row-container'>
          <div className='flex-left'/>
          <div className='flex-center'>
            <div className='search-container'>
              <form onSubmit={e => { e.preventDefault(); if (this.validResult()) { this.routeChange( '/items/' + (this.state.results[0]).ItemId); }}} >
                <input value={this.state.query} placeholder='Search...' name='term' ref={input => this.search = input} onChange={this.handleInputChange} autoComplete="off"/>
                <button onClick={() => { if (this.validResult()) { this.routeChange( '/items/' + (this.state.results[0]).ItemId); }}} className='search-button' type="button">Search</button>
              </form>
              <div className='search-dropdown'>
                <ul>
                  {this.state.results.map(item => (
                    <li key={item.ItemId} unselectable="on" class="unselectable" onClick={() => { this.handleItemClick(item.ItemId, item.ItemName)}}>{item.ItemName}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className='flex-right'/>
        </div>
      </div>
    );
  }

}