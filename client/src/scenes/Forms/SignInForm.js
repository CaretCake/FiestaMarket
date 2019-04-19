import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { authenticationService } from '../../services/export';
import axios from 'axios';


export class SignInForm extends React.Component {

  constructor(props) {
    super(props);

    if (authenticationService.currentUserValue) {
      this.props.history.push('/');
    }
  }

  handleSignInSubmit = (e) => {
    e.preventDefault();
    authenticationService.login(e.target.email.value, e.target.pass.value)
      .then(
        user => {
          const { from } = this.props.location.state || { from: { pathname: "/" } };
          this.props.history.push(from);
        },
        error => {
          console.log(error);
        }
      );
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
    return (
      <Tabs>
        <TabList>
          <Tab>Sign In</Tab>
          <Tab>Register</Tab>
        </TabList>

        <TabPanel>
          <form onSubmit={this.handleSignInSubmit} method="POST" multipart='urlencoded'>
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
    )
  }
}