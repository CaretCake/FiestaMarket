import React, { Component } from 'react';
import { authenticationService } from '../../services/export';
import {AliasList, Loading} from '../../components/export';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export class AliasSection extends Component {
  render() {
    if (this.props.aliases === 0 || !this.props.userId)
      return <ul className='alias-list'>
        <li className='alias-list-item empty-list-item'>
          { this.props.dataReceived ? <h3>no orders found</h3> : <Loading/> }
        </li>
      </ul>;

    return (
      <div className='alias-section'>
        <div className='alias-title'>
          <h3>Aliases</h3>
          {
            authenticationService.currentUserValue
            &&
            parseFloat(authenticationService.currentUserValue.userId) === parseFloat(this.props.userId)
            &&
            <button onClick={console.log('hi')}><FontAwesomeIcon icon={faPlus}/></button>
          }
        </div>
        <ul className='alias-list'>
          <AliasList
            aliasList={this.props.aliases}
            deleteFromAliasList={this.props.deleteFromAliasList}
            updateFromAliasList={this.props.updateFromAliasList}
            dataReceived={this.props.dataReceived}
            view={ (authenticationService.currentUserValue && parseFloat(authenticationService.currentUserValue.userId) === parseFloat(this.props.userId)) ?
              'managing' : 'viewing'}
          />
        </ul>
      </div>
    );
  }
}