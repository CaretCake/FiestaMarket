import React from 'react';
import "react-tabs/style/react-tabs.css";
import {userService} from "../../services/user.service";
import {handleResponse} from "../../helpers/handle-response";

export class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: null
    };
  }

  componentWillMount() {
    userService.getAll()
      .then(handleResponse())
      .then(userListFromApi => {
        if (!userListFromApi) {
          //console.log('that is a problem');
        }
        this.setState({userList: userListFromApi});
      })
      .catch(err => {}/*console.log('profile err: ' + JSON.stringify(err))*/);
  }

  render() {
    if(!this.state.userList)
      return null;

    let userListArray = this.state.userList.map((user) => {
      return (
        <li key={ user.userId }> { user.userName } </li>
      );
    });

    return (
      <div>
        Admin page! This is safe.
        <ul>
          { userListArray }
        </ul>
      </div>
    );
  }
}