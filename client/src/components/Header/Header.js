import React from 'react';
import fiestaMarketLogo from './fiesta-market-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "react-tabs/style/react-tabs.css";
import axios from 'axios';
import { authenticationService } from '../../services/export';
import {Role} from "../../helpers/role";

export class Header extends React.Component {

  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
    this.logoutUser = this.logoutUser.bind(this);


    this.state = {
      currentUser: null,
      isAdmin: false
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x => {
      console.log('x: ' + JSON.stringify(x));
      this.setState({
        currentUser: x,
        isAdmin: x && x.role === Role.Admin
      })});
  }

  componentWillUnmount() {
    authenticationService.currentUser.unsubscribe();
  }

  routeChange(path) {
    this.props.history.push(path);
  }

  logoutUser() {
    authenticationService.logout();
    this.routeChange('/');
  }

  render() {
    const { currentUser, isAdmin } = this.state;

    return (
      <div class="header-container">
        { currentUser && <p>logged in!</p>}
        <div class="background"/>
        <Link to='/' className="logo"><img src={fiestaMarketLogo} alt="Logo"/></Link>
        <ul class="nav-list">
          <li><button onClick={() => this.routeChange('login')} className="nav">Sign In</button></li>
          <li><button onClick={this.displayStatusOptions} className="nav">Status: Online</button></li>
          <li><button className="nav"><FontAwesomeIcon icon={faEnvelope}/> Messages</button></li>
          <li><button className="nav">Notifications</button></li>
          <li><button onClick={() => this.routeChange('profile')} className="nav">Profile</button></li>
          <li><button onClick={() => this.logoutUser()} className="nav"><FontAwesomeIcon icon={faSignOutAlt} /> Sign Out</button></li>
        </ul>

      </div>
    );

  }
}