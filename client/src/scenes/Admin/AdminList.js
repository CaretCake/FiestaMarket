import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserMinus, faTrashAlt, faChevronDown} from "@fortawesome/free-solid-svg-icons";

export const UserList = ({ itemList }) => (
  <ul>
    {itemList.map((user, index) => {
      return <li className='user-list-item' key={index}>
        <div className='list-icon user-status'>{user.status}</div>
        <div class='user-info'>
          <h4>{user.userName}</h4>
          <div>Role: {user.role}</div>
        </div>
        <div className='buttons'>
          <button><FontAwesomeIcon icon={faUserMinus} /></button>
        </div>
      </li>;
    })}
  </ul>
);

export const ContactList = ({ itemList }) => (
  <ul>
    {itemList.map((contactSubmission, index) => {
      return <li className='contact-list-item' key={index}>
        <div class='contact-info'>
          <h4>{contactSubmission.id }: { contactSubmission.reasonForMessage }</h4>
          <span>{ contactSubmission.createdAt }</span>
        </div>
        <div className='contact-content expand'>
          <span>{ contactSubmission.email ? contactSubmission.email : 'no email included' }</span>
          <div className='message'>{ contactSubmission.message }</div>
        </div>
        <div className='buttons'>
          <button><FontAwesomeIcon icon={faTrashAlt} /></button>
          <button><FontAwesomeIcon icon={faChevronDown} /></button>
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
        <div class='sell-info'>
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
          <button><FontAwesomeIcon icon={faTrashAlt} /></button>
          <button><FontAwesomeIcon icon={faChevronDown} /></button>
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
        <div class='buy-info'>
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
          <button><FontAwesomeIcon icon={faTrashAlt} /></button>
          <button><FontAwesomeIcon icon={faChevronDown} /></button>
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

    console.log(this.props.itemList);

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