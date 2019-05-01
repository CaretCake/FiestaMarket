import React from 'react';
import { orderService } from '../../services/export';
import { handleResponse } from '../../helpers/export';
import { FilterSection } from "../export";
import { OrderSection } from '../../components/export';

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
      .catch(err => { /*console.log('err: ' + err);*/ });
  }

  render() {
    return (
      <div>
        <FilterSection
          buyOrders={this.state.buyOrders}
          sellOrders={this.state.sellOrders}
          handleFilter={this.handleFilter.bind(this)}
          savedBuyOrders={this.state.savedBuyOrders}
          savedSellOrders={this.state.savedSellOrders}
        />
        <div className='order-view-section flex-row-container'>
          <div className='flex-left'/>
          <div className='flex-center list-container'>
            <OrderSection
              buyOrders={this.state.buyOrders}
              sellOrders={this.state.sellOrders}
              view={'viewing'}
            />
          </div>
          <div className='flex-right'/>
        </div>
      </div>
    );
  }
}