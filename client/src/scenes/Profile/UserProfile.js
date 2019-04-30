import React, { Component } from 'react';
import { userService } from '../../services/export';
import { handleResponse } from '../../helpers/handle-response';
import { AliasSection } from '../export';
import { AliasList, OrderSection } from '../../components/export';
import { AliasForm } from "../Forms/AliasForm";

export class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };

    this.addNewAlias = this.addNewAlias.bind(this);
  }

  componentDidMount() {
    console.log(this.props.userId);
    userService.getById(this.props.userId)
      .then(handleResponse())
      .then(userInfoFromApi => {
        if (!userInfoFromApi) {
          this.props.history.push('/404/Error');
        }
        console.log(userInfoFromApi);
        this.setState({user: userInfoFromApi.user });
      })
      .catch(err => {}/*console.log('profile err: ' + JSON.stringify(err))*/);
  }

  addNewAlias(alias) {
    console.log('adding: ' + alias);
    let temp = this.state.user;
    temp.Aliases.push(alias);
    this.setState({ user: temp });
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
          <AliasForm
            addToAliasList={this.addNewAlias}
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