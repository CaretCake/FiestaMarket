import React from 'react';

class Modal extends React.Component {
  render() {
    return (
      <div className='modal'>
        <div className='modal_inner'>
          <h1>{this.props.text}</h1>
          <button onClick={this.props.closeModal}>close me</button>
        </div>
      </div>
    );
  }
}

class PageFooter extends React.Component {

  constructor() {
    super();
    this.state = {
      showContactForm: false
    };
  }
  toggleContactForm() {
    this.setState({
      showContactForm: !this.state.showContactForm
    });
  }

  render() {
    return (
      <div>
        {this.state.showContactForm ?
          <Modal
            text='Contact Us'
            closeModal={this.toggleContactForm.bind(this)}
          />
          : null
        }
        <div class="footer-container">
          <div class="footer-left">
            <div class="footer-links">
              <h3>Links</h3>
              <button onClick={this.toggleContactForm.bind(this)}>Contact Us/Report a Bug</button>
            </div>
          </div>
          <div class="footer-right">
            <div class="footer-disclaimer">
              <h4>Disclaimer</h4>
              <p>Gamigo, Fiesta Online and the logo Fiesta Online are registered trademarks. All rights are reserved worldwide. This site has no official link with Gamigo or Fiesta Online. All artwork, screenshots, characters or other recognizable features of the intellectual property relating to these trademarks are likewise the intellectual property of Gamigo.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default PageFooter;