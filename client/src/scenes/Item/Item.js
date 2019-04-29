import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { itemService } from '../../services/export';
import { handleResponse } from '../../helpers/export';
import { SellOrderForm, BuyOrderForm } from "../export";

export class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      averageSellPrice: null,
      averageBuyPrice: null,
      sellOrderFormVisibility: false,
      buyOrderFormVisibility: false
    };
  }

  componentDidMount() {
    this.getItemInfo(this.props.match.params.itemId);
  }

  componentDidUpdate(prevProps) {
    if(this.props.match.params.itemId !== prevProps.match.params.itemId) {
      console.log('change');
      this.getItemInfo(this.props.match.params.itemId);
    }
  }

  getItemInfo(id) {
    itemService.getById(id)
      .then(handleResponse())
      .then(itemInfoFromApi => {
        if (!itemInfoFromApi) {
          this.props.history.push('/404/Error');
        }

        // Handle item info
        this.setState({item: itemInfoFromApi[0].data});

        // Handle average pricing info
        console.log('average sell: ' + JSON.stringify(itemInfoFromApi[1]));
        console.log('average buy: ' + JSON.stringify(itemInfoFromApi[2]));
        let tempSell = parseFloat(itemInfoFromApi[1].data.average[0].average);
        let tempBuyMin = itemInfoFromApi[2].data.average[0].minAverage ? parseFloat(itemInfoFromApi[2].data.average[0].minAverage) : 'Insufficient history';
        let tempBuyMax = itemInfoFromApi[2].data.average[0].maxAverage ? parseFloat(itemInfoFromApi[2].data.average[0].maxAverage) : 'Insufficient history';

        this.setState({averageSellPrice: tempSell});
        console.log(this.state.averageSellPrice);
        this.setState({averageBuyPrice: tempBuyMin + ' - ' + tempBuyMax});
        console.log(this.state.item);
      })
      .catch(err => {}/*console.log('item err: ' + JSON.stringify(err))*/);
  }

  toggleSellOrderForm() {
    this.setState({
      sellOrderFormVisibility: !this.state.sellOrderFormVisibility
    });
    this.setState({
      buyOrderFormVisibility: false
    });
  }

  toggleBuyOrderForm() {
    this.setState({
      buyOrderFormVisibility: !this.state.buyOrderFormVisibility
    });
    this.setState({
      sellOrderFormVisibility: false
    });
  }

  render() {
    if(this.state.item === {} || this.state.item === null) {
      return null;
    }

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
            <button onClick={this.toggleSellOrderForm.bind(this)}>Sell Item</button>
            <button onClick={this.toggleBuyOrderForm.bind(this)}>Buy Item</button>
          </div>
          <div className='form-section'>
            { this.state.sellOrderFormVisibility && < SellOrderForm item={this.state.item} /> }
            { this.state.buyOrderFormVisibility && < BuyOrderForm item={this.state.item} /> }
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