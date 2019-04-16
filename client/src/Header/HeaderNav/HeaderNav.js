import React from 'react';
import fiestaMarketLogo from './fiesta-market-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../Modals/Modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import axios from 'axios';

class HeaderNav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showSignInForm: false
    };
  }

  toggleSignInForm = (e) => {
    this.setState({
      showSignInForm: !this.state.showSignInForm
    });
  }

  handleSignInSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:9000/users/login', {
      username: e.target.username.value,
      password: e.target.pass.value
    })
      .then(user => console.log('signed in!'))
      .catch(err => console.log(err));
  }

  handleRegisterSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:9000/users/add', {
      username: e.target.username.value,
      email: e.target.email.value,
      pass: e.target.pass.value
    })
      .then(user => console.log('created!'))
      .catch(err => console.log(err));
  }

  render() {
    const signInForm = (
      <Tabs>
        <TabList>
          <Tab>Sign In</Tab>
          <Tab>Register</Tab>
        </TabList>

        <TabPanel>
          <form onSubmit={this.handleSignInSubmit} method="POST" multipart='urlencoded'>
            <label>
              Username:
              <input type="text" name="username" />
            </label>
            <label>
              Password:
              <input type="password" name="pass" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </TabPanel>
        <TabPanel>
          <form onSubmit={this.handleRegisterSubmit} method="POST">
            <label>
              Username:
              <input type="text" name="username" />
            </label>
            <label>
              Email:
              <input type="text" name="email" />
            </label>
            <label>
              Password:
              <input type="password" name="pass" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </TabPanel>
      </Tabs>
    );

    return (
      <div class="header-container">
        <div class="background"/>
        <a href='/' class="logo"><img src={fiestaMarketLogo} alt="Logo"/></a>
        <ul class="nav-list">
          <li><button onClick={this.toggleSignInForm} className="nav">Sign In</button></li>
          <li><button onClick={this.displayStatusOptions} class="nav">Status: Online</button></li>
          <li><button class="nav"><FontAwesomeIcon icon={faEnvelope}/> Messages</button></li>
          <li><button class="nav">Notifications</button></li>
          <li><button class="nav">Account</button></li>
          <li><button class="nav"><FontAwesomeIcon icon={faSignOutAlt} /> Sign Out</button></li>
        </ul>

        {this.state.showSignInForm ?
          <Modal
            title='Sign In'
            content={signInForm}
            closeModal={this.toggleSignInForm.bind(this)}
          />
          : null
        }
      </div>
    );
  }
}

export default HeaderNav;