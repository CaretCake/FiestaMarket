import React, { Component } from 'react';
import { itemService } from '../../services/export';
import { handleResponse } from '../../helpers/export';
import { SellOrderForm, BuyOrderForm } from "../export";
import { OrderSection } from '../../components/export';
import history from '../../helpers/history';

export class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      averageSellPrice: null,
      averageBuyPrice: null,
      sellOrderFormVisibility: false,
      buyOrderFormVisibility: false,
      dataReceived: false
    };
  }

  componentDidMount() {
    console.log(this.props.itemId);
    this.getItemInfo(this.props.itemId);
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps.itemId);
    console.log(this.props.itemId);
    if(this.props.itemId !== prevProps.itemId) {
      console.log('change');
      this.setState({buyOrderFormVisibility: false});
      this.setState({sellOrderFormVisibility: false});
      this.getItemInfo(this.props.itemId);
    }
  }

  getItemInfo(id) {
    itemService.getById(id)
      .then(handleResponse())
      .then(itemInfoFromApi => {
        if (!itemInfoFromApi) {
          history.push('/404/Error');
        }

        // Handle item info
        this.setState({item: itemInfoFromApi[0].data});

        // Handle average pricing info
        console.log('average sell: ' + JSON.stringify(itemInfoFromApi[1]));
        console.log('average buy: ' + JSON.stringify(itemInfoFromApi[2]));
        let tempSell = parseFloat(itemInfoFromApi[1].data.average[0].average);
        let tempBuyMin = itemInfoFromApi[2].data.average[0].minAverage ? parseFloat(itemInfoFromApi[2].data.average[0].minAverage) : 'N/A';
        let tempBuyMax = itemInfoFromApi[2].data.average[0].maxAverage ? parseFloat(itemInfoFromApi[2].data.average[0].maxAverage) : 'N/A';

        this.setState({averageSellDays: itemInfoFromApi[1].data.days });
        this.setState({averageBuyDays: itemInfoFromApi[2].data.days });
        this.setState({averageSellPrice: tempSell});
        this.setState({averageBuyPrice: tempBuyMin + ' - ' + tempBuyMax});
        this.setState({dataReceived: true});
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

    return (
      <div className='item-view'>
          <div className='item-info-section'>
            <div className='container'>
              <div className='main-info-section'>
                <h1>{ this.state.item.ItemName } lvl. { this.state.item.Level }</h1>
                <h3>{ this.state.item.Type } | { this.state.item.Class }</h3>
              </div>
                { this.state.item.TwoSetEffect && <ul className='set-effect-list'>
                  { this.state.item.TwoSetEffect && <li><span>2 Set Effect</span> <p>{ this.state.item.TwoSetEffect }</p></li> }
                  { this.state.item.ThreeSetEffect && <li><span>3 Set Effect</span> <p>{ this.state.item.ThreeSetEffect }</p></li> }
                  { this.state.item.FourSetEffect && <li><span>4 Set Effect</span> <p>{ this.state.item.FourSetEffect }</p></li> }
                  { this.state.item.FiveSetEffect && <li><span>5 Set Effect</span> <p>{ this.state.item.FiveSetEffect }</p></li> }
                </ul> }


              <div className='average-price-container'>
                <span>
                  <span className='title'>Avg. Sell</span>
                  { this.state.averageSellPrice ?
                    <React.Fragment>
                      { this.state.averageSellPrice } G
                      <span className='days'>{ this.state.averageSellDays } day</span>
                    </React.Fragment>
                    :
                    ' N/A'
                  }
                </span>
                <span>
                  <span className='title'>Avg. Buy</span>
                  { this.state.averageBuyPrice !== 'N/A - N/A' ?
                    <React.Fragment>
                      { this.state.averageBuyPrice } G
                      <span className='days'>{ this.state.averageBuyDays } day</span>
                    </React.Fragment>
                    :
                    ' N/A'
                  }
                </span>
              </div>

              <div className='button-container'>
                <button onClick={this.toggleSellOrderForm.bind(this)}>Sell Item</button>
                <button onClick={this.toggleBuyOrderForm.bind(this)}>Buy Item</button>
              </div>
            </div>
          </div>
          <div className='form-section'>
            { this.state.sellOrderFormVisibility && < SellOrderForm item={this.state.item} suggestedPrice={ this.state.averageSellPrice ? this.state.averageSellPrice : 'N/A' } /> }
            { this.state.buyOrderFormVisibility && < BuyOrderForm item={this.state.item} suggestedPrice={ this.state.averageBuyPrice ? this.state.averageBuyPrice : 'N/A' } /> }
          </div>
          <div className='order-view-section'>
            <div className='list-container'>
              <OrderSection
                buyOrders={this.state.item.BuyOrders}
                sellOrders={this.state.item.SellOrders}
                view={'viewing'}
                dataReceived={this.state.dataReceived}
              />
            </div>
        </div>
      </div>
    );
  }
}