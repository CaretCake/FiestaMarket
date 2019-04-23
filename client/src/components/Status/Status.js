import React from 'react';
import { userService, authenticationService} from '../../services/export';

export class Status extends React.Component {

  handleClick = (status) => () => {
    console.log(status);
    userService.updateById(this.props.userId, status);
    authenticationService.currentUserValue.status = status;
  };

  render() {

    console.log(this.props.status);
    return (
      <div className='status-select-container'>
          <span className={ this.props.status === 'online' ? 'selected online' : '' } onClick={this.handleClick('online')}>online</span>
          <span className={ this.props.status === 'in-game' ? 'selected in-game' : ''} onClick={this.handleClick('in-game')}>in-game</span>
          <span className={ this.props.status === 'offline' ? 'selected offline' : ''} onClick={this.handleClick('offline')}>offline</span>
      </div>
    );
  }
}