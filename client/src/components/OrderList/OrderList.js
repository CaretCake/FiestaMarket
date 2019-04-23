import React from 'react';
import { OrderListItem } from './OrderListItem/OrderListItem';

export class OrderList extends React.Component {

  render() {
    if (!this.props.orderType || !this.props.orderList)
      return null;

    return (
      <div className='order-view-list'>
        <h2>{this.props.orderType}</h2>

        {this.props.orderList.map((order, index) => {
          return <div className='order-list-item' key={ this.props.orderType === 'sell'? order.SellOrderId : order.BuyOrderId }>
            <OrderListItem order={order} orderType={this.props.orderType} />
          </div>;
        })}

      </div>
    );
  }
}