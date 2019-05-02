import React from 'react';
import history from '../../helpers/history';

export class Footer extends React.Component {

  constructor(props) {
    super(props);

    this.routeChange = this.routeChange.bind(this);
  }

  routeChange(path) {
    history.push(path);
  }

  render() {

    return (
      <div>
        <div className='footer-container'>
          <div className='footer-left'>
            <div className='footer-links'>
              <h3>Links</h3>
              <button onClick={() => this.routeChange('/contact')}>Contact Us/Report a Bug</button>
            </div>
          </div>
          <div className='footer-right'>
            <div className='footer-disclaimer'>
              <h4>Disclaimer</h4>
              <p>Gamigo, Fiesta Online and the logo Fiesta Online are registered trademarks. All rights are reserved
                worldwide. This site has no official link with Gamigo or Fiesta Online. All artwork, screenshots,
                characters or other recognizable features of the intellectual property relating to these trademarks are
                likewise the intellectual property of Gamigo.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}