import React, { Component } from 'react';
import { authenticationService } from '../../services/export';
import { OrderList } from '../../components/export';

export class OrdersSection extends Component {
  render() {
    return (
        <div className="orders-section">
          <div>
            <h2>Sell</h2>
            <ul>
              <OrderList
                orderType={'sell'}
                orderList={this.props.sellOrders}
                view={
                  this.props.view
                  ||
                  (authenticationService.currentUserValue && parseFloat(authenticationService.currentUserValue.userId) === parseFloat(this.props.userId) ?
                    'managing' : 'viewing')
                }
              />
            </ul>
          </div>
          <div>
            <h2>Buy</h2>
            <ul>
              <OrderList
                orderType={'buy'}
                orderList={this.props.buyOrders}
                view={
                  this.props.view
                  ||
                  (authenticationService.currentUserValue && parseFloat(authenticationService.currentUserValue.userId) === parseFloat(this.props.userId) ?
                  'managing' : 'viewing')
                }
              />
            </ul>
          </div>
        </div>
    );
  }
}