import React, { Component } from 'react';
import { userService } from '../../services/export';

export class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentWillMount() {
    userService.getById(this.props.match.params.userId)
      .then(userInfoFromApi => {
        if (!userInfoFromApi) {
          console.log('no info' + userInfoFromApi);
          this.props.history.push('/NotFound');
        }
        this.setState({user: userInfoFromApi});
      })
  }

  render() {
    if(!this.state.user)
      return null;

    let aliasesArray = this.state.user.Aliases.map((alias) => {
      return (
        <li> { alias.AliasName } </li>
      );
    });

    let buyOrderArray = this.state.user.BuyOrders.map((buyOrder) => {
      return (
        <li> { buyOrder.PostedItem.ItemName } </li>
      );
    });

    let sellOrderArray = this.state.user.SellOrders.map((sellOrder) => {
      return (
        <li> { sellOrder.PostedItem.ItemName } </li>
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