import React from 'react';
import { OrderListItem, OrderListItemEdited } from './OrderListItem';

export class OrderList extends React.Component {

  render() {
    if (!this.props.orderType || !this.props.orderList)
      return <div className='order-view-list'>
        No items found
      </div>;

    return (
      <div className='order-view-list'>
        {this.props.orderList.map((order, index) => {
          console.log(order);
          console.log(this.props.orderType);
          return <OrderListItemEdited order={order} orderType={this.props.orderType} view={this.props.view} key={index} />;
        })}
      </div>
    );
  }
}