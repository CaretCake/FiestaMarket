import React from 'react';

export const Clipboard = ({ userInfo, type, itemName, itemPrice, toggle }) => {
  let messageStr = '/w ' + (userInfo.AliasName || userInfo);
  if (type === 'sell') {
    messageStr += ' I want to buy your ' + itemName + ' for ' + itemPrice + 'G (fiestamarket.app)';
  } else {
    messageStr += ' I have the ' + itemName + ' you\'re buying for ' + itemPrice + 'G (fiestamarket.app)';
  }
  return <div className='clipboard cover-order'>
    <input readOnly={true} value={ messageStr } />
    <button onClick={(e) => {
      toggle(false);
    }}>Close</button>
  </div>;
};

export class Offer  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gemPrice: 0,
      goldPrice: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state.gemPrice + ' - ' + this.state.goldPrice);
  }

  handleSubmit() {

  }

  render() {
    return <div className='offer cover-order'>
      <input type='number' name='gemPrice' className='number-field' onChange={this.handleChange} min={0} max={99999} placeholder={0}/>
      <span className='gem-icon'/>
      <input type='number' name='goldPrice' className='number-field' onChange={this.handleChange} min={0} max={99} placeholder={0}/>
      <span className='gold-icon'/>
      <button onClick={(e) => {
        this.props.makeOffer(this.state.gemPrice + '.' + this.state.goldPrice);
      }}>Offer
      </button>
      <button onClick={(e) => {
        this.props.toggle(false);
      }}>Close
      </button>
    </div>;
  }
}