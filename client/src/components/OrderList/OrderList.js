import React from 'react';
import { OrderListItem } from './OrderListItem/OrderListItem';

export class OrderList extends React.Component {

  render() {
    if (!this.props.orderType || !this.props.orderList)
      return null;

    return (
      <div className='order-view-list'>
        {this.props.orderList.map((order, index) => {
          return <OrderListItem order={order} orderType={this.props.orderType} key={index} />;
        })}

      </div>
    );
  }
}