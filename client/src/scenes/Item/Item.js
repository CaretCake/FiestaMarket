import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { itemService } from '../../services/export';
import { handleResponse } from "../../helpers/handle-response";
import {SellOrderForm} from "../Forms/SellOrderForm";

export class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      orderFormVisibility: false
    };
  }

  componentWillMount() {
    this.getItemInfo(this.props.match.params.itemId);
  }

  componentWillReceiveProps(nextProps) {
    this.getItemInfo(nextProps.match.params.itemId);
  }

  getItemInfo(id) {
    itemService.getById(id)
      .then(handleResponse())
      .then(itemInfoFromApi => {
        if (!itemInfoFromApi) {
          console.log('no info: ' + itemInfoFromApi);
          this.props.history.push('/404/Error');
        }
        this.setState({item: itemInfoFromApi.data});
      })
      .catch(err => console.log('item err: ' + JSON.stringify(err)));
  }

  toggleOrderForm() {
    this.setState({
      orderFormVisibility: !this.state.orderFormVisibility
    })
  }

  render() {
    if(this.state.item === {}) {
      return null;
    }

    console.log(JSON.stringify(this.state.item));

    let buyOrderArray = [];
    let sellOrderArray = [];
    if (this.state.item.BuyOrders) {
      buyOrderArray = this.state.item.BuyOrders.map((buyOrder) => {
        return (
          <li key={buyOrder.BuyOrderId}> {this.state.item.ItemName} from {buyOrder.PostingUser.userName} </li>
        );
      });
    }
    if (this.state.item.SellOrders) {
      sellOrderArray = this.state.item.SellOrders.map((sellOrder) => {
        return (
          <li key={sellOrder.SellOrderId}> {this.state.item.ItemName} - <Link to={'/profile/' + sellOrder.PostingUser.userId}>{sellOrder.PostingUser.userName}</Link> </li>
        );
      });
    }

    return (
      <div className='item-view flex-row-container'>
        <div className='flex-left'/>
        <div className='flex-center'>
          <div className='item-info-section'>
            <h1 className={ this.state.item.ItemRarity + '-item-rarity' }>{ this.state.item.ItemName }</h1>
            <h4>Level { this.state.item.Level }</h4>
            { this.state.item.TwoSetEffect && <ul>
              { this.state.item.TwoSetEffect && <li><span>Two Set Effect</span> { this.state.item.TwoSetEffect }</li> }
              { this.state.item.ThreeSetEffect && <li><span>Three Set Effect</span> { this.state.item.ThreeSetEffect }</li> }
              { this.state.item.FourSetEffect && <li><span>Four Set Effect</span> { this.state.item.FourSetEffect }</li> }
              { this.state.item.FiveSetEffect && <li><span>Five Set Effect</span> { this.state.item.FiveSetEffect }</li> }
            </ul> }
            <p>Type: { this.state.item.Type }</p>
            <p>Class: { this.state.item.Class }</p>
            <button onClick={this.toggleOrderForm.bind(this)}>Sell Item</button>
          </div>
          <div className='form-section'>
            { this.state.orderFormVisibility && < SellOrderForm item={this.state.item} /> }
          </div>
          <div className='orders-section'>
            <div>
              <h3>Want to Buy</h3>
              <ul>
                { buyOrderArray }
              </ul>
            </div>
            <div>
              <h3>Want to Sell</h3>
              <ul>
                { sellOrderArray }
              </ul>
            </div>
          </div>
        </div>
        <div className='flex-right'/>
      </div>
    );
  }
}