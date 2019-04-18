import React, { Component } from 'react';
import axios from 'axios';

export class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentWillMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    console.log('get info!');
    axios.get(`http://localhost:9000/users?userId=${this.props.match.params.userId}`)
      .then(userInfo => {
        this.setState({ user: userInfo.data });
        console.log('info: ' + JSON.stringify(this.state.user));
      })
      .catch(err => console.log('error: ' + err));
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