import React from 'react';
import Modal from '../Modals/Modal'

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
    const contactForm = (
      <form onSubmit={this.handleSubmit}>
        <label>
          Select why you are contacting us:
          <select onChange={this.handleChange}>
            <option value="feedback">General Feedback</option>
            <option value="bug">Report a Bug</option>
            <option value="question">Ask a Question</option>
          </select>
        </label>
        <label>
          Message:
          <textarea onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );

    return (
      <div>
        {this.state.showContactForm ?
          <Modal
            title='Contact Us'
            content={contactForm}
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