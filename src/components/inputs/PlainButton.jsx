import { classNames } from '../../utils';
import React from 'react';

const PlainButton = ({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={classNames(
        'inline-flex items-center justify-center text-center border border-transparent text-gray-500 hover:text-gray-600 disabled:opacity-30 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default React.forwardRef(PlainButton);
