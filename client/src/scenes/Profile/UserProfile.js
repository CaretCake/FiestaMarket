import React, { Component } from 'react';
import { userService } from '../../services/export';
import { handleResponse } from "../../helpers/handle-response";

export class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentWillMount() {
    userService.getById(this.props.match.params.userId)
      .then(handleResponse())
      .then(userInfoFromApi => {
        if (!userInfoFromApi) {
          this.props.history.push('/404/Error');
        }
        this.setState({user: userInfoFromApi});
      })
      .catch(err => {}/*console.log('profile err: ' + JSON.stringify(err))*/);
  }

  render() {
    if(!this.state.user)
      return null;

    let aliasesArray = this.state.user.Aliases.map((alias) => {
      return (
        <li key={ alias.id }> { alias.AliasName } </li>
      );
    });
    let buyOrderArray = this.state.user.BuyOrders.map((buyOrder) => {
      return (
        <li key={ buyOrder.BuyOrderId }> { buyOrder.PostedItem.ItemName } </li>
      );
    });
    let sellOrderArray = this.state.user.SellOrders.map((sellOrder) => {
      return (
        <li key={ sellOrder.SellOrderId }> { sellOrder.PostedItem.ItemName } </li>
      );
    });

    return (
      <div>
        <h1>{ this.state.user.userName }</h1>
        <h4>{ this.state.user.status }</h4>
        <ul>
          { aliasesArray }
        </ul>
        <div class="orders-section">
          <h3>Want to Buy</h3>
          <ul>
            { buyOrderArray }
          </ul>
          <h3>Want to Sell</h3>
          <ul>
            { sellOrderArray }
          </ul>
        </div>
      </div>
    );
  }
}