import React from 'react';

export class OrderListItem extends React.Component {

  render() {
    if (!this.props.orderType || !this.props.order)
      return null;

    if(this.props.orderType === 'sell') {
      return (
        <div className='order-view-list-item'>
          {JSON.stringify(this.props.order)}
        </div>
      );
    } else {
      return (
        <div className='order-view-list-item'>
          {JSON.stringify(this.props.order)}
        </div>
      );
    }
  }
}