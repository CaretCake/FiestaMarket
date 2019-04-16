import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import axios from 'axios';

class SignInForm extends React.Component {

  constructor(props) {
    super(props);
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
    return (
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
    )
  }
}

export default SignInForm;