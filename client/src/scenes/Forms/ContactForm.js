import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import axios from 'axios';

export class ContactForm extends React.Component {

  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  handleChange = (e) => {

  }

  render() {
    return (
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
    )
  }
}