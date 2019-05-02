import React, { Component } from 'react';
import { authenticationService } from '../../services/export';
import { OrderList } from '../export';

export class OrderSection extends Component {
  render() {
    return (
        <div className="order-section">
          <span>
            <h2>Sell</h2>
            <OrderList
              orderType={'sell'}
              orderList={this.props.sellOrders}
              dataReceived={this.props.dataReceived}
              view={
                this.props.view
                ||
                (authenticationService.currentUserValue && parseFloat(authenticationService.currentUserValue.userId) === parseFloat(this.props.userId) ?
                  'managing' : 'viewing')
              }
            />
          </span>
          <span>
            <h2>Buy</h2>
            <OrderList
              orderType={'buy'}
              orderList={this.props.buyOrders}
              dataReceived={this.props.dataReceived}
              view={
                this.props.view
                ||
                (authenticationService.currentUserValue && parseFloat(authenticationService.currentUserValue.userId) === parseFloat(this.props.userId) ?
                'managing' : 'viewing')
              }
            />
          </span>
        </div>
    );
  }
}