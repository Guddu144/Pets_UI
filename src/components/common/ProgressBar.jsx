import { classNames, formatCurrency } from '../../utils';
import React from 'react';

const ProgressBar = ({ className, progress, spent, target }) => {
  return (
    <div className="grid grid-cols-6">
      <div className={classNames(
        'w-full bg-gray-200 rounded-mg h-2.5 flex items-center col-span-5 mt-2',
        className,
      )}>
        <div
          className="bg-green-120 h-2.5 rounded-md animate-pulse S"
          style={{ width: `${progress * 100}%` }}
        />
        <span className={`text-slate-500 text-xs pl-2 ${(spent == target) ? 'hidden' : ''}`}>{(spent)}</span>
      </div>
      <span className="ml-4 col-span-1 font-semibold">{formatCurrency(target)}</span>
    </div>

  );
};

export default ProgressBar;
