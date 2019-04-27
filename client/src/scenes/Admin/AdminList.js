import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMinus, faTrashAlt, faChevronDown, faEye, faEyeSlash, faCheck, faEdit, faClock } from '@fortawesome/free-solid-svg-icons';
import { orderService, contactFormService, userService, authenticationService } from '../../services/export';

export const UserList = ({ itemList }) => (
  <ul>
    {itemList.map((user, index) => {
      return <li className='user-list-item' key={index}>
        <div className='list-icon user-status'>{user.status}</div>
        <div className='user-info'>
          <h4>{user.userName}</h4>
          <div>Role: {user.role}</div>
        </div>
        <div className='buttons'>
          <button onClick={ (e) => userService.deleteUserById(user.userId) }><FontAwesomeIcon icon={faUserMinus} /> Delete User</button>
        </div>
      </li>;
    })}
  </ul>
);

export const ContactList = ({ itemList }) => (
  <ul>
    {itemList.map((contactSubmission, index) => {
      return <li className='contact-list-item' key={index}>
        <div className='contact-info'>
          <h4>{contactSubmission.id }: { contactSubmission.reasonForMessage }</h4>
          <span>{ contactSubmission.createdAt }</span>
        </div>
        <div className='contact-content expand'>
          <span>{ contactSubmission.email ? contactSubmission.email : 'no email included' }</span>
          <div className='message'>{ contactSubmission.message }</div>
        </div>
        <div className='buttons'>
          <button onClick={ (e) => contactFormService.deleteContactFormSubmissionById(contactSubmission.id) }><FontAwesomeIcon icon={faTrashAlt} /></button>
          <button><FontAwesomeIcon icon={faChevronDown} /> Show Info</button>
        </div>
      </li>;
    })}
  </ul>
);

export const SellOrderList = ({ itemList }) => (
  <ul>
    {itemList.map((sellOrder, index) => {
      return <li className='sell-order-list-item' key={index}>
        <div className='list-icon sell-status'>{sellOrder.SaleStatus}</div>
        <div className='sell-info'>
          <h4>{sellOrder.SellOrderId }: { sellOrder.PostedItem.ItemName }</h4>
          <span>Posted by: { sellOrder.PostingUser.userName }</span>
          <span>{ sellOrder.createdAt }</span>
        </div>
        <div className='sell-content expand'>
          <ul>
            <li>Server: { sellOrder.Server }</li>
            <li>Price: { parseFloat(sellOrder.Price) }</li>
            <li>Taking offers: { sellOrder.OpenToOffers ? 'yes' : 'no' }</li>
          </ul>
        </div>
        <div className='buttons'>
          <button onClick={ (e) => orderService.deleteSellOrderById(sellOrder.SellOrderId) }><FontAwesomeIcon icon={faTrashAlt} /></button>
          { sellOrder.SaleStatus === 'active' || sellOrder.SaleStatus === 'pending' ?
            <button onClick={ (e) => orderService.updateSellOrderById(sellOrder.SellOrderId, null, null, 'expired', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, authenticationService.currentUser.userId) }><FontAwesomeIcon icon={faEye} />  Visible</button> :
            <button onClick={ (e) => orderService.updateSellOrderById(sellOrder.SellOrderId, null, null, 'active', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, authenticationService.currentUser.userId) }><FontAwesomeIcon icon={faEyeSlash} /> Invisible</button> }
          <button onClick={ (e) => orderService.updateSellOrderById(sellOrder.SellOrderId, null, null, 'pending', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, authenticationService.currentUser.userId) }><FontAwesomeIcon icon={faClock} /> Pending</button>
          <button onClick={ (e) => orderService.updateSellOrderById(sellOrder.SellOrderId, null, null, 'sold', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, authenticationService.currentUser.userId) }><FontAwesomeIcon icon={faCheck} /> Sold</button>
          <button><FontAwesomeIcon icon={faEdit} /> Edit</button>
        </div>
      </li>;
    })}
  </ul>
);

export const BuyOrderList = ({ itemList }) => (
  <ul>
    {itemList.map((buyOrder, index) => {
      return <li className='buy-order-list-item' key={index}>
        <div className='list-icon buy-status'>{buyOrder.OrderStatus}</div>
        <div className='buy-info'>
          <h4>{buyOrder.BuyOrderId }: { buyOrder.PostedItem.ItemName }</h4>
          <span>Posted by: { buyOrder.PostingUser.userName }</span>
          <span>{ buyOrder.createdAt }</span>
        </div>
        <div className='buy-content expand'>
          <ul>
            <li>Server: { buyOrder.Server }</li>
            <li>Price Range: { parseFloat(buyOrder.PriceMin) } - { parseFloat(buyOrder.PriceMax) }</li>
          </ul>
        </div>
        <div className='buttons'>
          <button onClick={ (e) => orderService.deleteBuyOrderById(buyOrder.BuyOrderId) }><FontAwesomeIcon icon={faTrashAlt} /></button>
          { buyOrder.OrderStatus === 'active' ?
            <button onClick={ (e) => orderService.updateBuyOrderById(buyOrder.BuyOrderId, null, null, 'expired', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, authenticationService.currentUser.userId) }><FontAwesomeIcon icon={faEye} />  Visible</button> :
            <button onClick={ (e) => orderService.updateBuyOrderById(buyOrder.BuyOrderId, null, null, 'active', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, authenticationService.currentUser.userId) }><FontAwesomeIcon icon={faEyeSlash} /> Invisible</button> }
          <button onClick={ (e) => orderService.updateBuyOrderById(buyOrder.BuyOrderId, null, null, 'bought', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, authenticationService.currentUser.userId) }><FontAwesomeIcon icon={faCheck} /> Bought</button>
          <button><FontAwesomeIcon icon={faEdit} /> Edit</button>
        </div>
      </li>;
    })}
  </ul>
);

export class AdminList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.itemList) {
      return null;
    }

    return (
      <div className='admin-list'>
        <ul>
          { this.props.type === 'user' && <UserList itemList={this.props.itemList}/> }
          { this.props.type === 'contact' && <ContactList itemList={this.props.itemList}/> }
          { this.props.type === 'sell' && <SellOrderList itemList={this.props.itemList}/> }
          { this.props.type === 'buy' && <BuyOrderList itemList={this.props.itemList}/> }
        </ul>
      </div>
    );
  }
}