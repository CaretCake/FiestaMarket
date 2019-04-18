import React from 'react';
import fiestaMarketLogo from './fiesta-market-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "react-tabs/style/react-tabs.css";
import axios from 'axios';

class HeaderNav extends React.Component {

  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  routeChange(path) {
    this.props.history.push(path);
  }

  logoutUser() {
    axios.get('http://localhost:9000/users/logout')
      .then(user => {
        console.log('signed out ' + user);

      })
      .catch(err => console.log(err));
  }

  render() {

    return (
      <div class="header-container">
        <div class="background"/>
        <Link to='/' class="logo"><img src={fiestaMarketLogo} alt="Logo"/></Link>
        <ul class="nav-list">
          <li><button onClick={() => this.routeChange('login')} class="nav">Sign In</button></li>
          <li><button onClick={this.displayStatusOptions} class="nav">Status: Online</button></li>
          <li><button class="nav"><FontAwesomeIcon icon={faEnvelope}/> Messages</button></li>
          <li><button class="nav">Notifications</button></li>
          <li><button onClick={() => this.routeChange('profile')} class="nav">Profile</button></li>
          <li><button onClick={() => this.logoutUser()} class="nav"><FontAwesomeIcon icon={faSignOutAlt} /> Sign Out</button></li>
        </ul>

      </div>
    );

  }
}

export default HeaderNav;