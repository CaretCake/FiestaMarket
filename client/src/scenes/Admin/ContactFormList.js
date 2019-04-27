import React from 'react';

export class ContactFormList extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    if (!this.props.contactList) {
      return null;
    }

    return (
      <div>
        list
      </div>
    );
  }
}