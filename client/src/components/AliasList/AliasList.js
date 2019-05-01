import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAsterisk, faEdit, faBan, faTrash } from '@fortawesome/free-solid-svg-icons';
import { userService, authenticationService } from '../../services/export';

export class AliasListItem  extends React.Component {


  render() {
    console.log(this.props.alias);

    return (
      <li className='alias-list-item'>
        <div className='alias-info'>
      <span>
      <h3>{this.props.alias.AliasName}</h3>
        {this.props.alias.Preferred && <FontAwesomeIcon icon={faAsterisk} size='xs'/>}
      </span>
          <span>
      {(this.props.alias.Type.toLowerCase) === 'in-game' ? this.props.alias.Server : this.props.alias.Type}
      </span>
        </div>
        {this.props.view === 'managing' &&
        <div>
          <button onClick={(e) => {
            userService.deleteUserAliasById(this.props.alias.id, authenticationService.currentUserValue.userId);
            this.props.deleteFromAliasList(this.props.alias.id);
          }}><FontAwesomeIcon icon={faTrash}/></button>
          {this.props.alias.Preferred ?
            <button
              onClick={(e) => {
                userService.updateUserAliasById(this.props.alias.id, authenticationService.currentUserValue.userId, null, !this.props.alias.Preferred);
                this.props.updateFromAliasList(this.props.alias.id, !this.props.alias.Preferred);
              }}>
              <FontAwesomeIcon icon={faAsterisk}/> Preferred</button>
            :
            <button
              onClick={(e) => {
                userService.updateUserAliasById(this.props.alias.id, authenticationService.currentUserValue.userId, null, !this.props.alias.Preferred);
                this.props.updateFromAliasList(this.props.alias.id, !this.props.alias.Preferred);
              }}>
              <FontAwesomeIcon icon={faBan}/> Not Pref.</button>
          }
          <button><FontAwesomeIcon icon={faEdit}/> Edit</button>
        </div>
        }
      </li>
    );
  }
}

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
            return<AliasListItem
              alias={alias} view={this.props.view}
              key={index}
              deleteFromAliasList={this.props.deleteFromAliasList}
              updateFromAliasList={this.props.updateFromAliasList}
            />;
          })
        }
      </React.Fragment>
    );
  }
}