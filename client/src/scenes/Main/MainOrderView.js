import React from 'react';
import { OrderList } from '../../components/OrderList/OrderList';
import { orderService } from '../../services/export';
import { handleResponse } from '../../helpers/export';
import { FilterSection } from "../export";

export class MainOrderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buyOrders: null,
      sellOrders: null,
      savedBuyOrders: null,
      savedSellOrders: null,
      values: null
    };
    const handleFilter  = this.handleFilter.bind(this);
  }

  componentWillMount() {
    this.getOrderLists();
  }

  handleFilter(filteredSellOrders, filteredBuyOrders) {
    this.setState({ sellOrders: filteredSellOrders });
    this.setState({ buyOrders: filteredBuyOrders });
  };

  getOrderLists() {
    orderService.getAll()
      .then(handleResponse())
      .then(orderInfoFromApi => {
        this.setState({sellOrders: orderInfoFromApi[0].data});
        this.setState({buyOrders: orderInfoFromApi[1].data});
        this.setState({savedSellOrders: orderInfoFromApi[0].data});
        this.setState({savedBuyOrders: orderInfoFromApi[1].data});
      })
      .catch(err => { console.log('err: ' + err); });
  }

  sort() {
    this.setState(prevState => ({ sellOrders: this.state.savedSellOrders }));
    this.setState(prevState => ({ sellOrders:
      this.state.savedSellOrders.filter((value, index, arr) => {
        // if minlevel set and < min level, false
        if (this.state.values.minLevel !== '' && value.PostedItem.Level < this.state.values.minLevel) {
          return false;
        }
        // if maxlevel set and > max level, false
         if (this.state.values.maxLevel !== '' && value.PostedItem.Level > this.state.values.maxLevel) {
          return false;
        }
        // if minprice set and < min price, false
        if (this.state.values.priceMin !== '' && value.Price < this.state.values.priceMin) {
          return false;
        }
        // if maxprice set and > max price, false
         if (this.state.values.priceMax !== '' && value.Price > this.state.values.priceMax) {
          return false;
        }
        // if server !== 'None' and server !== server, false
         if (this.state.values.server !== 'None' && value.Server !== this.state.values.server) {
          return false;
        }
        // if class !== 'None and class !== class, false
        //TODO: Fix this
        if (this.state.values.class !== 'All' && value.PostedItem.Class !== 'all' && !(this.state.values.class.toLowerCase()).match(value.PostedItem.Class.toLowerCase())) {
          return false;
        }
        // if type !== 'None and type !== type, false
        if (this.state.values.type !== 'None' && value.PostedItem.Type !== this.state.values.type) {
          return false;
        }
        return true;
    })}));
  }



  render() {
    console.log(this.state.sellOrders);
    console.log('val: ' + JSON.stringify(this.state.values));

    if(!this.state.buyOrders && !this.state.sellOrders)
      return null;


    return (
      <div>
        <FilterSection
          buyOrders={this.state.buyOrders}
          sellOrders={this.state.sellOrders}
          handleFilter={this.handleFilter.bind(this)}
          savedBuyOrders={this.state.savedBuyOrders}
          savedSellOrders={this.state.savedSellOrders}
          onFormSubmit={(values) => {this.setState({values: values}); this.sort(); }}
        />
        <div className='order-view-section flex-row-container'>
          <div className='flex-left'/>
          <div className='flex-center list-container'>
            <div>
              <h2>Sell</h2>
              <OrderList
                orderType={'sell'}
                orderList={this.state.sellOrders}
              />
            </div>
            <div>
              <h2>Buy</h2>
              <OrderList
                orderType={'buy'}
                orderList={this.state.buyOrders}
              />
            </div>
          </div>
          <div className='flex-right'/>
        </div>
      </div>
    );
  }
}