import React, { Component } from 'react';
import { userService, authenticationService } from '../../services/export';
import { handleResponse } from "../../helpers/handle-response";
import { AliasList, OrderList } from "../../components/export";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

export class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    console.log(this.props);
    userService.getById(this.props.userId)
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

    return (
      <div className='user-profile'>
        <h1>{ this.state.user.userName }</h1>
        <h4>{ this.state.user.status }</h4>
        <span className='alias-section'>
          <div className='alias-title'>
            <h3>Aliases</h3>
            { parseFloat(authenticationService.currentUserValue.userId) === parseFloat(this.props.userId) &&
              <button onClick={{}}><FontAwesomeIcon icon={faPlus}/></button>
            }
          </div>
          <ul className='alias-list'>
            <AliasList
              aliasList={this.state.user.Aliases}
              view={ parseFloat(authenticationService.currentUserValue.userId) === parseFloat(this.props.userId) ?
                'managing' : 'viewing'}
            />
          </ul>
        </span>
        <div className="orders-section">
          <h3>Want to Buy</h3>
          <ul>
            <OrderList
              orderType={'buy'}
              orderList={this.state.user.BuyOrders}
              view={ parseFloat(authenticationService.currentUserValue.userId) === parseFloat(this.props.userId) ?
                'managing' : 'viewing'}
            />
          </ul>
          <h3>Want to Sell</h3>
          <ul>
            <OrderList
              orderType={'sell'}
              orderList={this.state.user.SellOrders}
              view={ parseFloat(authenticationService.currentUserValue.userId) === parseFloat(this.props.userId) ?
                'managing' : 'viewing'}
            />
          </ul>
        </div>
      </div>
    );
  }
}