import React, { Component } from 'react';
import { authenticationService } from '../../services/export';
import { AliasList } from '../../components/export';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export class AliasSection extends Component {
  render() {
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
            view={ (authenticationService.currentUserValue && parseFloat(authenticationService.currentUserValue.userId) === parseFloat(this.props.userId)) ?
              'managing' : 'viewing'}
          />
        </ul>
      </div>
    );
  }
}