import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAsterisk, faEdit, faBan, faTrash } from '@fortawesome/free-solid-svg-icons';
import { userService, authenticationService, orderService } from '../../services/export';

export const AliasListItem = ({ alias, view }) => (
  <li className='alias-list-item'>
    <div className='alias-info'>
      <span>
        <h3>{ alias.AliasName }</h3>
        { alias.Preferred && <FontAwesomeIcon icon={ faAsterisk } size='xs' /> }
      </span>
      <span>
        { alias.Type === 'in-game' ? alias.Server : alias.Type }
      </span>
    </div>
    { view === 'managing' &&
      <div>
        <button onClick={ (e) => userService.deleteUserAliasById(alias.id, authenticationService.currentUserValue.userId) }><FontAwesomeIcon icon={ faTrash } /></button>
        { alias.Preferred ?
          <button onClick={ (e) => userService.updateUserAliasById(alias.id, authenticationService.currentUserValue.userId, null, !alias.Preferred) }><FontAwesomeIcon icon={ faAsterisk } />  Preferred</button>
          :
          <button onClick={ (e) => userService.updateUserAliasById(alias.id, authenticationService.currentUserValue.userId, null, !alias.Preferred) }><FontAwesomeIcon icon={ faBan } /> Not Pref.</button>
        }
        <button><FontAwesomeIcon icon={faEdit} /> Edit</button>
      </div>
    }
  </li>
);

export class AliasList extends React.Component {

  render() {
    if (!this.props.view || !this.props.aliasList)
      return <div className='alias-view-list'>
        No items found
      </div>;

    return (
      <React.Fragment>
        {
          this.props.aliasList.map((alias, index) => {
            return <AliasListItem alias={alias} view={this.props.view} key={index} />;
          })
        }
      </React.Fragment>
    );
  }
}