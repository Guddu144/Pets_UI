import React from 'react';

import Icon from './Icon';
import { classNames } from '../../utils';

import spinnerIcon from '../../icons/spinner.svg';

const colors = {
  'primary': 'text-white bg-green-120 hover:bg-green-500 focus:ring-blue-800 font-semibold shadow-sm border border-transparent',
  'secondary': 'bg-gray-200 text-gray-500 hover:bg-gray-300 focus:ring-gray-300 font-semibold shadow-sm border border-transparent',
  'alternate': 'text-white bg-black-100 hover:bg-blue-800 focus:ring-blue-600 font-semibold shadow-sm border border-transparent',
  'light': 'text-blue-900 bg-gray-50 hover:bg-blue-200 focus:ring-blue-500 font-semibold shadow-sm border border-transparent',
  'clear': 'border-[1.5px] border-gray-200 hover:bg-gray-100 focus:ring-blue-600 text-gray-700',
  'none': '',
};

const sizes = {
  'xs': 'px-2.5 py-1.5 text-xs',
  'sm': 'px-3 py-2 text-sm',
  'base': 'px-4 py-2 text-sm',
  'lg': 'px-4 py-3',
  'xl': 'px-6 py-3.5',
  'none': '',
};

const Button = ({ children, isLoading, full, rounded, centered = true, kind = 'primary', size = 'base', className, info, ...props }) => {
  return (
    <button
      type="button"
      className={classNames(
        full ? 'w-full' : 'w-auto',
        kind !== 'none' && 'inline-flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50',
        rounded ? 'rounded-full' : 'rounded-md',
        centered ? ' justify-center text-center' : 'text-left',
        colors[kind],
        sizes[size],
        className,
      )}
      {...props}
    >
      {isLoading && (
        <Icon icon={spinnerIcon} className="animate-spin h-5 w-5 mr-2" />
      )}
      {children}
    </button>
  );
};

export default Button;
