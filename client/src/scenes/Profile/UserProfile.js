import React, { Component } from 'react';
import { userService } from '../../services/export';
import { handleResponse } from '../../helpers/handle-response';
import { AliasSection } from '../export';
import {Loading, OrderList, OrderSection} from '../../components/export';
import { AliasForm } from '../Forms/AliasForm';

export class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      aliasList:  null,
      buyOrderList: null,
      sellOrderList: null,
      dataReceived: false
    };

    this.addNewAlias = this.addNewAlias.bind(this);
    this.deleteAlias = this.deleteAlias.bind(this);
    this.updateAlias = this.updateAlias.bind(this);
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
        this.setState({aliasList: this.state.user.Aliases });
        this.setState({buyOrderList: this.state.user.BuyOrders });
        this.setState({sellOrderList: this.state.user.SellOrders });
        this.setState({dataReceived: true});
      })
      .catch(err => {}/*console.log('profile err: ' + JSON.stringify(err))*/);
  }

  addNewAlias(alias) {
    console.log('adding: ' + alias);
    let temp = this.state.aliasList;
    temp.push(alias);
    //this.setState({ aliasList: temp });
    this.setState(prevState => ({ aliasList: temp }));
  }

  deleteAlias(delId) {
    this.setState(prevState => ({
      aliasList: prevState.aliasList.filter((alias) => {
        return alias.id !== delId;
      })
    }));
  }

  updateAlias(updId, updateValue) {
    let tempAliasList = [...this.state.aliasList];
    tempAliasList.forEach(function(alias) {
      if (alias.id === updId) {
        alias.Preferred = updateValue;
      }
    });
    this.setState(prevState => ({ aliasList: tempAliasList }));
    console.log(this.state.aliasList);
  }

  render() {

    return (
      <div className='user-profile'>
        <div className='user-info-section'>
          {this.state.dataReceived &&
            <React.Fragment>
              <h1>{ this.state.user.userName }</h1>
              <h4>{ this.state.user.status }</h4>
            </React.Fragment>
          }
          <AliasSection
            aliases={this.state.aliasList}
            userId={this.props.userId}
            dataReceived={this.state.dataReceived}
            deleteFromAliasList={this.deleteAlias}
            updateFromAliasList={this.updateAlias}
          />
          <AliasForm
            addToAliasList={this.addNewAlias}
          />
        </div>
        <OrderSection
          buyOrders={this.state.buyOrderList}
          sellOrders={this.state.sellOrderList}
          userId={this.props.userId}
          user={this.props.user}
        />
      </div>
    );
  }
}