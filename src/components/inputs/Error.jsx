import React from 'react';

import { classNames } from '../../utils';

const Error = ({ error, className }) => {
  let msg = error.message;
  if (!msg) {
    switch (error.type) {
      case 'min':
        msg = 'please enter a larger value';
        break;
      case 'max':
        msg = 'please enter a smaller value';
        break;
      case 'minLength':
        msg = 'please enter a longer value';
        break;
      case 'validate':
        msg = 'please enter a valid value';
        break;
      default:
        break;
    }
  }
  return (
    <div
      className={classNames('text-sm text-red-500', className)}
    >
      {msg}
    </div>
  );
};

export default Error;

