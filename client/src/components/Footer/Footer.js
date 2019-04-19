import React from 'react';

export class Footer extends React.Component {

  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
    /*this.state = {
      showContactForm: false
    };*/
  }

  /*toggleContactForm() {
    this.setState({
      showContactForm: !this.state.showContactForm
    });
  }*/

  routeChange(path) {
    this.props.history.push(path);
  }

  render() {

    return (
      <div>
        <div class="footer-container">
          <div class="footer-left">
            <div class="footer-links">
              <h3>Links</h3>
              <button onClick={() => this.routeChange('/contact')}>Contact Us/Report a Bug</button>
            </div>
          </div>
          <div class="footer-right">
            <div class="footer-disclaimer">
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