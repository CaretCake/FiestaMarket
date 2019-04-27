import React, { Component } from 'react';
import { userService } from '../../services/export';
import { handleResponse } from "../../helpers/handle-response";
import { OrderList } from "../../components/OrderList/OrderList";
import {OrderListItem} from "../../components/OrderList/OrderListItem";

export class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    userService.getById(this.props.match.params.userId)
      .then(handleResponse())
      .then(userInfoFromApi => {
        if (!userInfoFromApi) {
          this.props.history.push('/404/Error');
        }
        this.setState({user: userInfoFromApi.user });
      })
      .catch(err => {}/*console.log('profile err: ' + JSON.stringify(err))*/);
  }

  render() {
    if(!this.state.user)
      return null;

    console.log(JSON.stringify(this.state.user.BuyOrders));
    let aliasesArray = this.state.user.Aliases.map((alias) => {
      return (
        <li key={ alias.id }> { alias.AliasName } </li>
      );
    });

    return (
      <div>
        <h1>{ this.state.user.userName }</h1>
        <h4>{ this.state.user.status }</h4>
        <ul>
          { aliasesArray }
        </ul>
        <div className="orders-section">
          <h3>Want to Buy</h3>
          <ul>
            <OrderList
              orderType={'buy'}
              orderList={this.state.user.BuyOrders}
              view={'manage'}
            />
          </ul>
          <h3>Want to Sell</h3>
          <ul>
            <OrderList
              orderType={'sell'}
              orderList={this.state.user.SellOrders}
              view={'manage'}
            />
          </ul>
        </div>
      </div>
    );
  }
}