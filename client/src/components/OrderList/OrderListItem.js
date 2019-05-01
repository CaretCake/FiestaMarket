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
import { getStatArray } from '../../helpers/stats';
import {authenticationService, orderService} from '../../services/export';
import { Clipboard, Offer } from './OrderCovers';
import { Loading } from '../../components/export';

export class OrderListItem extends React.Component {

  constructor(props) {
    super(props);
    this.toggleClipboard = this.toggleClipboard.bind(this);
    this.toggleOffer = this.toggleOffer.bind(this);
    this.makeOffer = this.makeOffer.bind(this);

    this.state = {
      showClipboard: false,
      showOffer: false,
      loading: false
    };
  }

  toggleClipboard(state) {
    this.setState({
      showClipboard: state
    });
  }

  toggleOffer(state) {
    this.setState({
      showOffer: state
    });
  }

  makeOffer(offerAmount) {
    this.setState({ loading: true });
    this.setState({ showOffer: false });
    orderService.postOfferOnSellOrder(offerAmount, this.props.order.SellOrderId)
      .then( res => {
        this.setState({ loading: false });
      });
  }

  render() {
    let status = this.props.order.SaleStatus ? this.props.order.SaleStatus : this.props.order.OrderStatus;
    if (this.props.view === 'viewing' && status !== 'active' && status !== 'pending') {
      return null;
    }


    return (
      <li className='order-view-list-item flex-row-container'>
        <div  className='order-item-left'>
          <FontAwesomeIcon icon={faImage} />
          <span>lvl. {parseFloat(this.props.order.PostedItem.Level)}</span>
        </div>
        <div className='order-item-center'>
          <div className='order-name-section'>
            <Link to={'/items/' + this.props.order.PostedItem.ItemId}><h3>{this.props.order.PostedItem.ItemName}</h3></Link>
            <span>+{this.props.orderType === 'sell' ? this.props.order.Enhancement : this.props.order.DesiredEnhancement}</span>
            <div className='price-section'>
              {this.props.orderType === 'sell' ?
                <div>
                  <span>{parseFloat(this.props.order.Price)}</span>
                  <span>G</span>
                </div> :
                <div>
                  <span>{parseFloat(this.props.order.PriceMin)}</span>
                  -
                  <span>{parseFloat(this.props.order.PriceMax)}</span>
                  <span>G</span>
                </div>
              }
              <span>{this.props.order.Server}</span>
            </div>
          </div>
          <div className='stat-list flex-row-container'>
            <ul>
              {getStatArray(this.props.order.PostedItem.StatType, 'upper').map((statName) => {
                if ((this.props.orderType === 'buy' && this.props.order[('Desired' + statName)] !== 'N/A') || this.props.orderType === 'sell') {
                  return <li className='stat' key={this.props.orderType === 'sell' ? statName : ('Desired' + statName)}>
                    <div>{this.props.orderType === 'sell' ? this.props.order[statName] : this.props.order[('Desired' + statName)]}</div>
                    <div>{statName}</div>
                  </li>;
                } else {
                  return null;
                }
              })}
            </ul>
          </div>
          <div>
            <Link to={'/profile/' + this.props.order.PostingUserUserId} className='user-link'>{this.props.order.PostingUser.userName}</Link>
          </div>
        </div>
        {this.props.view === 'viewing' &&  authenticationService.currentUserValue && authenticationService.currentUserValue.userId !== this.props.order.PostingUserUserId ?
            <div className='order-item-right'>
              <button onClick={(e) => this.toggleClipboard(true)}><FontAwesomeIcon icon={faComment}/></button>
              {this.props.orderType === 'sell' && this.props.order.OpenToOffers === true &&
              <button onClick={(e) => this.toggleOffer(true)} className='bottom-button'><FontAwesomeIcon
                icon={faCommentDollar}/></button>
              }
            </div>
          :
            <div className='order-item-right'/>
        }
        {this.props.view ==='managing' &&  authenticationService.currentUserValue && authenticationService.currentUserValue.userId === this.props.order.PostingUserUserId &&
          <div className={this.props.view === 'managing' ? 'wide-buttons order-item-right' : 'order-item-right'}>
            {this.props.orderType === 'sell' ?
              <React.Fragment>
                <button onClick={(e) => orderService.deleteSellOrderById(this.props.order.SellOrderId, this.props.order.PostingUserUserId)}>
                  <FontAwesomeIcon icon={faTrashAlt}/></button>
                {this.props.order.SaleStatus === 'active' || this.props.order.SaleStatus === 'pending' ?
                  <button
                    onClick={(e) => orderService.updateSellOrderById(this.props.order.SellOrderId, null, 'expired', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.props.order.PostingUserUserId)}>
                    <FontAwesomeIcon icon={faEye}/> Visible</button>
                  :
                  <button
                    onClick={(e) => orderService.updateSellOrderById(this.props.order.SellOrderId, null, 'active', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.props.order.PostingUserUserId)}>
                    <FontAwesomeIcon icon={faEyeSlash}/> Invisible</button>
                }
                <button
                  onClick={(e) => orderService.updateSellOrderById(this.props.order.SellOrderId, null, 'pending', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.props.order.PostingUserUserId)}>
                  <FontAwesomeIcon icon={faClock}/> Pending
                </button>
                <button
                  onClick={(e) => orderService.updateSellOrderById(this.props.order.SellOrderId, null, 'sold', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.props.order.PostingUserUserId)}>
                  <FontAwesomeIcon icon={faCheck}/> Sold
                </button>
                <button><FontAwesomeIcon icon={faEdit}/> Edit</button>
              </React.Fragment>
              :
              <React.Fragment>
                <button onClick={(e) => orderService.deleteBuyOrderById(this.props.order.BuyOrderId, this.props.order.PostingUserUserId)}>
                  <FontAwesomeIcon icon={faTrashAlt}/></button>
                {this.props.order.OrderStatus === 'active' ?
                  <button
                    onClick={(e) => orderService.updateBuyOrderById(this.props.order.BuyOrderId, null, null, 'expired', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.props.order.PostingUserUserId)}>
                    <FontAwesomeIcon icon={faEye}/> Visible</button>
                  :
                  <button
                    onClick={(e) => orderService.updateBuyOrderById(this.props.order.BuyOrderId, null, null, 'active', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.props.order.PostingUserUserId)}>
                    <FontAwesomeIcon icon={faEyeSlash}/> Invisible</button>
                }
                <button
                  onClick={(e) => orderService.updateBuyOrderById(this.props.order.BuyOrderId, null, null, 'bought', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.props.order.PostingUserUserId)}>
                  <FontAwesomeIcon icon={faCheck}/> Bought
                </button>
                <button><FontAwesomeIcon icon={faEdit}/> Edit</button>
              </React.Fragment>
            }
          </div>
        }
        {this.state.showClipboard ?
          <Clipboard
            userInfo={this.props.order.PostingUser.Aliases[0]}
            type={this.props.orderType === 'sell' ? 'sell' : 'buy'}
            itemName={this.props.order.PostedItem.ItemName}
            itemPrice={this.props.orderType === 'sell' ? parseFloat(this.props.order.Price) : parseFloat(this.props.order.PriceMin) + ' - ' + parseFloat(this.props.order.PriceMax)}
            toggle={this.toggleClipboard}
          />
          :
          null
        }
        {this.state.showOffer ?
          <Offer
            userInfo={this.props.order.PostingUser.Aliases[0]}
            itemName={this.props.order.PostedItem.ItemName}
            toggle={this.toggleOffer}
            makeOffer={this.makeOffer}
          />
          :
          null
        }
        {this.state.loading && <Loading/>}
      </li>
    );
  }
}