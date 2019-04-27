import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCommentDollar,
  faComment,
  faImage,
  faTrashAlt,
  faEye,
  faEyeSlash,
  faClock, faCheck, faEdit
} from '@fortawesome/free-solid-svg-icons';
import { getStatArray } from "../../helpers/stats";
import { orderService, authenticationService } from "../../services/export";

export const OrderListItemEdited = ({ order, orderType, view, key }) => (
  <li className='order-view-list-item flex-row-container'>
    <div  className='order-item-left'>
      <FontAwesomeIcon icon={faImage} />
    </div>
    <div className='order-item-center'>
      <div className='order-name-section'>
        <Link to={'/items/' + order.PostedItem.ItemId}><h3>{ order.PostedItem.ItemName }</h3></Link>
        <span>+{ orderType === 'sell' ? order.Enhancement : order.DesiredEnhancement }</span>
        <div className='price-section'>
          <div>
            <span>Level: { parseFloat(order.PostedItem.Level) }</span>
          </div>

            { orderType === 'sell' ?
              <div>
                <span>{ parseFloat(order.Price) }</span>
                <span>G</span>
              </div> :
              <div>
                <span>{ parseFloat(order.PriceMin) }</span>
                -
                <span>{ parseFloat(order.PriceMax) }</span>
                <span>G</span>
              </div>
            }

          <span>{ order.Server }</span>
        </div>
      </div>
      <div className='stat-list flex-row-container'>
        <ul>
          {getStatArray(order.PostedItem.StatType, 'upper').map((statName) => {
            if ((orderType === 'buy' && order[('Desired'+statName)] !== 'N/A') || orderType === 'sell') {
              return <li className='stat' key={orderType === 'sell' ? statName : ('Desired'+statName)}>
                <div>{orderType === 'sell' ? order[statName] : order[('Desired'+statName)]}</div><div>{statName}</div>
              </li>;
            } else {
              return null;
            }
          })}
        </ul>
      </div>
      <div>
        <Link to={'/profile/' + order.PostingUserUserId} className='user-link'>{ order.PostingUser.userName }</Link>
      </div>
    </div>
    {view === 'main' ?
      <div className='order-item-right'>
        <button><FontAwesomeIcon icon={faComment}/></button>
        {orderType === 'sell' && order.OpenToOffers === true &&
        <button className='bottom-button'><FontAwesomeIcon icon={faCommentDollar}/></button>
        }
      </div> :
      <div className={view === 'manage' ? 'wide-buttons order-item-right' : 'order-item-right'}>
      {orderType === 'sell' ?
          <React.Fragment>
            <button onClick={ (e) => orderService.deleteSellOrderById(order.SellOrderId, authenticationService.currentUserValue.userId) }><FontAwesomeIcon icon={faTrashAlt} /></button>
            { order.SaleStatus === 'active' || order.SaleStatus === 'pending' ?
              <button onClick={ (e) => orderService.updateSellOrderById(order.SellOrderId, null, 'expired', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, authenticationService.currentUserValue.userId) }><FontAwesomeIcon icon={faEye} />  Visible</button>
                :
              <button onClick={ (e) => orderService.updateSellOrderById(order.SellOrderId, null, 'active', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, authenticationService.currentUserValue.userId) }><FontAwesomeIcon icon={faEyeSlash} /> Invisible</button>
            }
            <button onClick={ (e) => orderService.updateSellOrderById(order.SellOrderId, null, 'pending', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, authenticationService.currentUserValue.userId) }><FontAwesomeIcon icon={faClock} /> Pending</button>
            <button onClick={ (e) => orderService.updateSellOrderById(order.SellOrderId, null, 'sold', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, authenticationService.currentUserValue.userId) }><FontAwesomeIcon icon={faCheck} /> Sold</button>
            <button><FontAwesomeIcon icon={faEdit} /> Edit</button>
          </React.Fragment>
        :
          <React.Fragment>
            <button onClick={ (e) => orderService.deleteBuyOrderById(order.BuyOrderId, authenticationService.currentUserValue.userId) }><FontAwesomeIcon icon={faTrashAlt} /></button>
            { order.OrderStatus === 'active' ?
              <button onClick={ (e) => orderService.updateBuyOrderById(order.BuyOrderId, null, null, 'expired', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, authenticationService.currentUserValue.userId) }><FontAwesomeIcon icon={faEye} />  Visible</button>
              :
              <button onClick={ (e) => orderService.updateBuyOrderById(order.BuyOrderId, null, null, 'active', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, authenticationService.currentUserValue.userId) }><FontAwesomeIcon icon={faEyeSlash} /> Invisible</button>
            }
            <button onClick={ (e) => orderService.updateBuyOrderById(order.BuyOrderId, null, null, 'bought', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, authenticationService.currentUserValue.userId) }><FontAwesomeIcon icon={faCheck} /> Bought</button>
            <button><FontAwesomeIcon icon={faEdit} /> Edit</button>
          </React.Fragment>
      }
      </div>


    }
  </li>
);

export class OrderListItem extends React.Component {

  render() {
    if (!this.props.orderType || !this.props.order) {
      return <div className='order-view-list-item flex-row-container'>
               No item to display
             </div>;
    }

    let stats = getStatArray(this.props.order.PostedItem.StatType, 'upper');

    if(this.props.orderType === 'sell') {
      return (
        <div className='order-view-list-item flex-row-container'>
          <div  className='order-item-left'>
            <FontAwesomeIcon icon={faImage} />
          </div>
          <div className='order-item-center'>
            <div className='order-name-section'>
              <Link to={'/items/' + this.props.order.PostedItem.ItemId}><h3>{ this.props.order.PostedItem.ItemName }</h3></Link>
              <span>+{ this.props.order.Enhancement }</span>
              <div className='price-section'>
                <div>
                  <span>Level: { parseFloat(this.props.order.PostedItem.Level) }</span>
                </div>
                <div>
                  <span>{ parseFloat(this.props.order.Price) }</span>
                  <span>G</span>
                </div>
                <span>{ this.props.order.Server }</span>
              </div>
            </div>
            <div className='stat-list flex-row-container'>
              <ul>
                {stats.map((statName) => {
                  return <li className='stat' key={statName}>
                    <div>{this.props.order[statName]}</div><div>{statName}</div>
                  </li>;
                })}
              </ul>
            </div>
            <div>
              <Link to={'/users/' + this.props.order.PostingUserUserId} className='user-link'>{ this.props.order.PostingUser.userName }</Link>
            </div>
          </div>
          <div className='order-item-right'>
            <button><FontAwesomeIcon icon={faComment} /></button>
            { this.props.order.OpenToOffers === true &&
              <button className='bottom-button'><FontAwesomeIcon icon={faCommentDollar} /></button>
            }
          </div>
        </div>
      );
    } else {
      return (
        <div className='order-view-list-item flex-row-container'>
          <div  className='order-item-left'>
            <FontAwesomeIcon icon={faImage} />
          </div>
          <div className='order-item-center'>
            <div className='order-name-section'>
              <Link to={'/items/' + this.props.order.PostedItem.ItemId}><h3>{ this.props.order.PostedItem.ItemName }</h3></Link>
              <span>+{ this.props.order.DesiredEnhancement }</span>
              <div className='price-section'>
                <div>
                  <span>Level: { parseFloat(this.props.order.PostedItem.Level) }</span>
                </div>
                <div>
                  <span>{ parseFloat(this.props.order.PriceMin) }</span>
                   -
                  <span>{ parseFloat(this.props.order.PriceMax) }</span>
                  <span>G</span>
                </div>
                <span>{ this.props.order.Server }</span>
              </div>
            </div>
            <div className='stat-list flex-row-container'>
              <ul className='flex-row-container'>
                {stats.map((statName) => {
                  if (this.props.order[('Desired'+statName)] !== 'N/A') {
                    return <li className='stat' key={('Desired'+statName)}>
                      <div>{this.props.order[('Desired'+statName)]}</div><div>{statName}</div>
                    </li>;
                  } else {
                    return null;
                  }
                })}
              </ul>
            </div>
            <div>
              <Link to={'/users/' + this.props.order.PostingUserUserId} className='user-link'>{ this.props.order.PostingUser.userName }</Link>
            </div>
          </div>
          <div className='order-item-right'>
            <button><FontAwesomeIcon icon={faComment} /></button>
          </div>
        </div>
      );
    }
  }
}