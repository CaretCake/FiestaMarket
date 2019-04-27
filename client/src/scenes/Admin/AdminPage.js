import React from 'react';
import { userService } from "../../services/user.service";
import { contactFormService } from "../../services/contact.service";
import { orderService } from '../../services/order.service';
import { handleResponse } from "../../helpers/handle-response";
import { AdminList } from "../../scenes/export";

export class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: null,
      contactList: null,
      buyOrders: null,
      sellOrders: null
    };
  }

  componentDidMount() {
    userService.getAll()
      .then(handleResponse())
      .then(userListFromApi => {
        if (!userListFromApi) {
          //console.log('that is a problem');
        }
        this.setState({userList: userListFromApi});
      })
      .catch(err => {}/*console.log('profile err: ' + JSON.stringify(err))*/);

    contactFormService.getAll()
      .then(handleResponse())
      .then(contactListFromApi => {
        if (!contactListFromApi) {
          //console.log('that is a problem');
        }
        this.setState({contactList: contactListFromApi});
      })
      .catch(err => {}/*console.log('profile err: ' + JSON.stringify(err))*/);

    orderService.getAll()
      .then(handleResponse())
      .then(orderInfoFromApi => {
        this.setState({sellOrders: orderInfoFromApi[0].data});
        this.setState({buyOrders: orderInfoFromApi[1].data});
      })
      .catch(err => { /*console.log('err: ' + err);*/ });
  }

  render() {
    return (
      <div>
        <h1>Administrate</h1>

        <AdminList type={'user'} itemList={this.state.userList} />
        <AdminList type={'contact'}  itemList={this.state.contactList} />
        <AdminList type={'sell'}  itemList={this.state.sellOrders} />
        <AdminList type={'buy'}  itemList={this.state.buyOrders} />

      </div>
    );
  }
}