import React, { Component } from 'react';
import { userService } from '../../services/export';
import { handleResponse } from '../../helpers/handle-response';
import { AliasSection } from '../export';
import { OrderSection } from '../../components/export';

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
          <div className='user-info-section'>
          <h1>{ this.state.user.userName }</h1>
          <h4>{ this.state.user.status }</h4>
          <AliasSection
            aliases={this.state.user.Aliases}
            userId={this.props.userId}
          />
        </div>
        <OrderSection
          buyOrders={this.state.user.BuyOrders}
          sellOrders={this.state.user.SellOrders}
          userId={this.props.userId}
          user={this.props.user}
        />
      </div>
    );
  }
}