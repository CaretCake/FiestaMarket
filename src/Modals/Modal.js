import React from 'react';

class Modal extends React.Component {
  render() {
    return (
      <div className='modal'>
        <div className='modal_inner'>
          <h1>{this.props.title}</h1>
          {this.props.content}
          <button onClick={this.props.closeModal}>Close</button>
        </div>
      </div>
    );
  }
}

export default Modal;