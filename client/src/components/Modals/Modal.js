import React from 'react';

export const Modal = (title, content, closeModal) => {
  return (
    <div className='modal'>
      <div className='modal_inner'>
        <h1>{title}</h1>
        {content}
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};
