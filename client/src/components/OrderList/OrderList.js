import React from 'react';
import { OrderListItem } from './OrderListItem';

export class OrderList extends React.Component {

  render() {
    if (!this.props.orderType || !this.props.orderList || this.props.orderList.length === 0)
      return <ul className='order-view-list'>
        <li className='order-view-list-item empty-list-item'>
          <h3>no orders found</h3>
        </li>
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