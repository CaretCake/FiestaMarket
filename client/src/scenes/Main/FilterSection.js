import React from 'react';
import Select from 'react-select';
import { orderService } from '../../services/export';
import { handleResponse } from '../../helpers/export';
import { Classes } from "../../helpers/export";

export class FilterSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [
        {priceMin: 0},
        {priceMax: 1},
        {levelMin: 0},
        {levelMax: 1}
      ],
      selectedClasses: []
    };
  }

  getOrderLists() {
    orderService.getAll()
      .then(handleResponse())
      .then(orderInfoFromApi => {
        this.setState({sellOrders: orderInfoFromApi[0].data});
        this.setState({buyOrders: orderInfoFromApi[1].data});
      })
      .catch(err => { console.log('err: ' + err); });
  }


  handleNumChange = (name, e) => {
    let tempFilters = [...this.state.filters];
    tempFilters[name] = e.target.value;
    this.setState({ filters: tempFilters }, this.filter);
  };

  handleChange = (selectedClasses) => {
    console.log(selectedClasses);
    this.setState({ selectedClasses }, this.filter);
  };

  filter() {
    let filteredSellData = this.props.savedSellOrders.filter((currentOrder, index, arr) => {
      if (parseFloat(this.state.filters.levelMin) > parseFloat(this.state.filters.levelMax) || parseFloat(this.state.filters.priceMin) > parseFloat(this.state.filters.priceMax)) {
        return false;
      }
      // if minlevel set and < min level, false
      else if (parseFloat(this.state.filters.levelMin) !== 0 && parseFloat(currentOrder.PostedItem.Level) < parseFloat(this.state.filters.levelMin)) {
        return false;
      }
      // if maxlevel set and > max level, false
      else if (parseFloat(this.state.filters.levelMax) > 0 && parseFloat(currentOrder.PostedItem.Level) > parseFloat(this.state.filters.levelMax)) {
        return false;
      }
      // if minprice set and < min price, false
      else if (parseFloat(this.state.filters.priceMin) !== 0 && parseFloat(currentOrder.Price) < parseFloat(this.state.filters.priceMin)) {
        return false;
      }
      // if maxprice set and > max price, false
      else if (parseFloat(this.state.filters.priceMax) > 0 && parseFloat(currentOrder.Price) > parseFloat(this.state.filters.priceMax)) {
        return false;
      }
      else if (this.state.selectedClasses.length > 0 && this.state.selectedClasses !== null && currentOrder.PostedItem.Class !== 'all') {
        console.log('matching: ' + JSON.stringify(this.state.selectedClasses));
        let match = 0;
        for (const classOption of this.state.selectedClasses) {
          if (Classes.allowedClasses[classOption.value].includes(currentOrder.PostedItem.Class)) {
            match++;
          }
        }
        if (match === 0) {
          return false;
        }
      }
      return true;
    });
    let filteredBuyData = this.props.savedBuyOrders.filter((currentOrder, index, arr) => {
      if (parseFloat(this.state.filters.levelMin) > parseFloat(this.state.filters.levelMax) || parseFloat(this.state.filters.priceMin) > parseFloat(this.state.filters.priceMax)) {
        return false;
      }
      // if minlevel set and < min level, false
      else if (parseFloat(this.state.filters.levelMin) !== 0 && parseFloat(currentOrder.PostedItem.Level) < parseFloat(this.state.filters.levelMin)) {
        return false;
      }
      // if maxlevel set and > max level, false
      else if (parseFloat(this.state.filters.levelMax) > 0 && parseFloat(currentOrder.PostedItem.Level) > parseFloat(this.state.filters.levelMax)) {
        return false;
      }
      // if minprice set and < min price, false
      else if (parseFloat(this.state.filters.priceMax) !== 0 && parseFloat(currentOrder.PriceMin) > parseFloat(this.state.filters.priceMax)) {
        return false;
      }
      // if maxprice set and > max price, false
      else if (parseFloat(this.state.filters.priceMin) > 0 && parseFloat(currentOrder.PriceMax) < parseFloat(this.state.filters.priceMin)) {
        return false;
      }
      else if (this.state.selectedClasses.length > 0 && this.state.selectedClasses !== null && currentOrder.PostedItem.Class !== 'all') {
        console.log('matching: ' + JSON.stringify(this.state.selectedClasses));
        let match = 0;
        for (const classOption of this.state.selectedClasses) {
          if (Classes.allowedClasses[classOption.value].includes(currentOrder.PostedItem.Class)) {
            match++;
          }
        }
        if (match === 0) {
          return false;
        }
      }
      return true;
    });

    this.props.handleFilter(filteredSellData, filteredBuyData);
  };

  render() {

    return (
      <div className='filter-section flex-row-container'>
        <div className='flex-left'/>
        <div className='flex-center'>
          <header>
            <h2>Recent Orders</h2>
          </header>
          <div className='number-row-container'>
            <div className='related-field-container'>
              <div className='field-container'>
                <div className='icon-field-container'>
                  <label>Min Price</label>
                  <input type='number' name='priceMin' value={ this.state.priceMin } onChange={ (e) => this.handleNumChange("priceMin", e) }  min={0} max={99999} placeholder={0}/>
                  <span className='gem-icon'/>
                </div>
              </div>
              <div className='field-container'>
                <div className='icon-field-container'>
                  <label>Max Price</label>
                  <input type='number' name='priceMax' value={ this.state.priceMax } onChange={ (e) => this.handleNumChange("priceMax", e) } min={1} max={99999} placeholder={'MAX'}/>
                  <span className='gem-icon'/>
                </div>
              </div>
            </div>

            <div className='related-field-container'>
              <div className='field-container'>
                <div className='icon-field-container'>
                  <label>Min Level</label>
                  <input type='number' name='levelMin' value={ this.state.levelMin } onChange={ (e) => this.handleNumChange("levelMin", e) }  min={0} max={99999} placeholder={0}/>
                </div>
              </div>
              <div className='field-container'>
                <div className='icon-field-container'>
                  <label>Max Level</label>
                  <input type='number' name='levelMax' value={ this.state.levelMax } onChange={ (e) => this.handleNumChange("levelMax", e) } min={1} max={99999} placeholder={'MAX'}/>
                </div>
              </div>
            </div>
          </div>

          <div className='field-container'>
            <Select
              className={'class-dropdown'}
              classNamePrefix={'class-dropdown'}
              value={this.state.selectedClasses}
              onChange={this.handleChange}
              options={Classes.classesValues}
              isSearchable={true}
              isMulti={true}
            />
          </div>
        </div>
        <div className='flex-right'/>
      </div>
    );
  }
}