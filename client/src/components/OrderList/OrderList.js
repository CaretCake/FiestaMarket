import React from 'react';
import { OrderListItem } from './OrderListItem';

export class OrderList extends React.Component {

  render() {
    if (!this.props.orderType || !this.props.orderList)
      return <ul className='order-view-list'>
        <li>No items found</li>
      </ul>;

    return (
      <ul className='order-view-list'>
        {this.props.orderList.map((order, index) => {
          return <OrderListItem
                    order={order}
                    orderType={this.props.orderType}
                    view={this.props.view}
                    key={index} />;
        })}
      </ul>
    );
  }
}