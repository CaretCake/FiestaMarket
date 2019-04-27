import React from 'react';
import { OrderListItem } from './OrderListItem';

export class OrderList extends React.Component {

  render() {
    if (!this.props.orderType || !this.props.orderList)
      return <div className='order-view-list'>
        No items found
      </div>;

    return (
      <div className='order-view-list'>
        {this.props.orderList.map((order, index) => {
          return <OrderListItem order={order} orderType={this.props.orderType} key={index} />;
        })}

      </div>
    );
  }
}