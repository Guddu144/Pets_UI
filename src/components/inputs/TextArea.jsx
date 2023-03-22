import React from 'react';

import Icon from './Icon';
import classNames from '../../utils/classnames';

import errorIcon from '../../icons/error-exclamation.svg';

const sizes = {
  'xs': 'px-2.5 py-1.5 text-xs',
  'sm': 'px-3 py-2 text-sm',
  'base': 'px-4 py-2',
  'lg': 'pr-3.5 py-3',
  'xl': 'px-6 py-3.5',
  'none': '',
};

const TextArea = ({ className, icon, hasError = false, size = 'base', ...props }, ref) => {
  return (
    <div className="relative">
      {icon && (<div className="absolute inset-3 w-6 flex items-center">{icon}</div>)}
      <textarea
        ref={ref}
        className={classNames(
          'appearance-none block w-full border rounded-md focus:outline-none focus:ring-1 bg-gray-50 border-gray-200 placeholder-gray-400 placeholder:font-light',
          icon
            ? 'pl-12'
            : 'pl-3.5',
          sizes[size],
          hasError
            ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-400 focus:border-red-400'
            : 'border-gray-300 focus:border-blue-700 focus:ring-blue-700',
          className,
        )}
        {...props}
      />
      {hasError && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <Icon icon={errorIcon} className="h-5 w-5 text-red-500" />
        </div>
      )}
    </div>
  );
};

export default React.forwardRef(TextArea);
