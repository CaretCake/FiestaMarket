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
import { orderService } from "../../services/export";

export const OrderListItem = ({ order, orderType, view }) => (
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
    {view === 'viewing' ?
      <div className='order-item-right'>
        <button><FontAwesomeIcon icon={faComment}/></button>
        {orderType === 'sell' && order.OpenToOffers === true &&
        <button className='bottom-button'><FontAwesomeIcon icon={faCommentDollar}/></button>
        }
      </div> :
      <div className={view === 'managing' ? 'wide-buttons order-item-right' : 'order-item-right'}>
      {orderType === 'sell' ?
          <React.Fragment>
            <button onClick={ (e) => orderService.deleteSellOrderById(order.SellOrderId, order.PostingUserUserId) }><FontAwesomeIcon icon={faTrashAlt} /></button>
            { order.SaleStatus === 'active' || order.SaleStatus === 'pending' ?
              <button onClick={ (e) => orderService.updateSellOrderById(order.SellOrderId, null, 'expired', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, order.PostingUserUserId) }><FontAwesomeIcon icon={faEye} />  Visible</button>
                :
              <button onClick={ (e) => orderService.updateSellOrderById(order.SellOrderId, null, 'active', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, order.PostingUserUserId) }><FontAwesomeIcon icon={faEyeSlash} /> Invisible</button>
            }
            <button onClick={ (e) => orderService.updateSellOrderById(order.SellOrderId, null, 'pending', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, order.PostingUserUserId) }><FontAwesomeIcon icon={faClock} /> Pending</button>
            <button onClick={ (e) => orderService.updateSellOrderById(order.SellOrderId, null, 'sold', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, order.PostingUserUserId) }><FontAwesomeIcon icon={faCheck} /> Sold</button>
            <button><FontAwesomeIcon icon={faEdit} /> Edit</button>
          </React.Fragment>
        :
          <React.Fragment>
            <button onClick={ (e) => orderService.deleteBuyOrderById(order.BuyOrderId, order.PostingUserUserId) }><FontAwesomeIcon icon={faTrashAlt} /></button>
            { order.OrderStatus === 'active' ?
              <button onClick={ (e) => orderService.updateBuyOrderById(order.BuyOrderId, null, null, 'expired', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, order.PostingUserUserId) }><FontAwesomeIcon icon={faEye} />  Visible</button>
              :
              <button onClick={ (e) => orderService.updateBuyOrderById(order.BuyOrderId, null, null, 'active', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, order.PostingUserUserId) }><FontAwesomeIcon icon={faEyeSlash} /> Invisible</button>
            }
            <button onClick={ (e) => orderService.updateBuyOrderById(order.BuyOrderId, null, null, 'bought', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, order.PostingUserUserId) }><FontAwesomeIcon icon={faCheck} /> Bought</button>
            <button><FontAwesomeIcon icon={faEdit} /> Edit</button>
          </React.Fragment>
      }
      </div>


    }
  </li>
);