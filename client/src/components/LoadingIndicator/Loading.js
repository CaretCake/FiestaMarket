import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

export const Loading = () => {
  return <div className='loading'>
    <span className='l-icon'>
      <FontAwesomeIcon icon={faCircleNotch} spin size="2x" />
    </span>
  </div>;
};