import React from 'react';
import { Link } from 'react-router-dom';
import fiestaMarketLogo from './fiesta-market-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { authenticationService } from '../../services/export';
import { Role } from "../../helpers/export";
import { Status } from "../export"

export class Header extends React.Component {

  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);


    this.state = {
      currentUser: null,
      isAdmin: false,
      statusVisibility: false
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x => {
      this.setState({
        currentUser: x,
        isAdmin: x && x.role === Role.Admin
      });
    });
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

  isLoggedIn() {
    return this.state.currentUser !== null;
  }

  toggleStatus() {
    this.setState( {
      statusVisibility: !this.state.statusVisibility
    });
  }

  render() {
    const { currentUser, isAdmin } = this.state;

    const loggedInNav = () => {
      return <React.Fragment>
        <li className='status' onMouseEnter={this.toggleStatus} onMouseLeave={this.toggleStatus}>
          { this.state.statusVisibility && <Status status={ currentUser.status } userId={ currentUser.userId } /> }
          <button className={"nav " + currentUser.status }>{ currentUser !== null ? currentUser.status : 'Status'}</button>
        </li>
        <li><button className="nav"><FontAwesomeIcon icon={faEnvelope}/>Messages</button></li>
        <li><button className="nav">Notifications</button></li>
        <li><button onClick={() => this.routeChange('/profile/' + (currentUser !== null ? currentUser.userId : ''))} className="nav">{ currentUser !== null ? currentUser.userName : 'Profile'}</button></li>
        { isAdmin && <li><button onClick={() => this.routeChange('/admin')} className="nav">Admin</button></li> }
        <li><button onClick={() => this.logoutUser()} className="nav"><FontAwesomeIcon icon={faSignOutAlt} /> Sign Out</button></li>
      </React.Fragment>;
    };
    const loggedOutNav = () => {
      return <li><button onClick={() => this.routeChange('/login')} className="nav">Sign In</button></li>;
    };

    return (
      <div className="header-container">
        <div className="background"/>
        <Link to='/' className="logo"><img src={fiestaMarketLogo} alt="Logo"/></Link>
        <ul className="nav-list">
          { this.isLoggedIn() ? loggedInNav() : loggedOutNav() }
        </ul>

      </div>
    );

  }
}