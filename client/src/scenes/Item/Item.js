import React, { Component } from 'react';
import { itemService } from '../../services/export';
import { handleResponse } from "../../helpers/handle-response";
import {SellOrderForm} from "../Forms/SellOrderForm";

export class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      orderFormVisbility: false
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
      orderFormVisbility: !this.state.orderFormVisbility
    })
  }

  render() {
    if(this.state.item === {})
      return null;

    /*let aliasesArray = this.state.item.Aliases.map((alias) => {
      return (
        <li key={  }> { alias.AliasName } </li>
      );
    });*/

    return (
      <div class='item-view flex-row-container'>
        <div class='flex-left'/>
        <div calss='flex-center'>
          <div class='item-info-section'>
            <h1 class={ this.state.item.ItemRarity + '-item-rarity' }>{ this.state.item.ItemName }</h1>
            <h4>Level { this.state.item.Level }</h4>
            { this.state.item.TwoSetEffect && <ul>
              { this.state.item.TwoSetEffect && <li><span>Two Set Effect</span> { this.state.item.TwoSetEffect }</li> }
              { this.state.item.ThreeSetEffect && <li><span>Three Set Effect</span> { this.state.item.ThreeSetEffect }</li> }
              { this.state.item.FourSetEffect && <li><span>Four Set Effect</span> { this.state.item.FourSetEffect }</li> }
              { this.state.item.FiveSetEffect && <li><span>Five Set Effect</span> { this.state.item.FiveSetEffect }</li> }
            </ul> }
            <p>Type: { this.state.item.Type }</p>
            <p>Class: { this.state.item.Class }</p>
          </div>
          <div class='form-section'>
            <button onClick={this.toggleOrderForm.bind(this)}>Sell Item</button>
            { this.state.orderFormVisbility && < SellOrderForm item={this.state.item} /> }
          </div>
          <div class='orders-section'>

          </div>
        </div>
        <div className='flex-right'/>
      </div>
    );
  }
}