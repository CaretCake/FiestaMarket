import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDollar, faComment, faImage } from '@fortawesome/free-solid-svg-icons';
import { getStatArray } from "../../../helpers/stats";

export class OrderListItem extends React.Component {

  render() {
    if (!this.props.orderType || !this.props.order) {
      return <div className='order-view-list-item flex-row-container'>
              <OrderListItem/>
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
              <Link to={'/users/' + this.props.order.PostedItem.ItemId}><h3>{ this.props.order.PostedItem.ItemName }</h3></Link>
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