import React from 'react';
import { OrderList } from '../../components/OrderList/OrderList';

import { orderService } from '../../services/export';
import { handleResponse } from '../../helpers/export';

export class MainOrderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buyOrders: null,
      sellOrders: null
    };
  }

  componentWillMount() {
    this.getOrderLists();
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

  render() {
    if(!this.state.buyOrders && !this.state.sellOrders)
      return null;

    return (
      <div className='order-view-section flex-row-container'>
        <div className='flex-left'/>
        <div className='flex-center list-container'>
          <div>
            <h2>Sell</h2>
            <OrderList orderType={'sell'} orderList={this.state.sellOrders} />
          </div>
          <div>
            <h2>Buy</h2>
            <OrderList orderType={'buy'} orderList={this.state.buyOrders} />
          </div>
        </div>
        <div className='flex-right'/>
      </div>
    );
  }
}