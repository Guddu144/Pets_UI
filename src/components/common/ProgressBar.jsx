import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { classNames, formatCurrency } from '../../utils';
import React from 'react';
import { Tooltip } from 'react-tippy';

const ProgressBar = ({ className, progress, spent, target }) => {
  const progressBarColor = progress > 0.75 ? 'bg-red-500' : 'bg-green-120';
  const isExceededTarget = spent > target;

  return (
    <div className="grid grid-cols-6">
      <div className={classNames(
        'w-full bg-gray-200 rounded-mg h-2.5 flex items-center col-span-5 mt-2',
        className,
      )}>
        <div
          className={`${progressBarColor} h-4 rounded-md `}
          style={{ width: `${progress * 100}%` }}
        />
        <span className={`text-slate-500 text-base font-semibold pl-2 ${isExceededTarget ? 'hidden' : ''}`}>
          {spent}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="ml-4 col-span-1 font-semibold">{formatCurrency(target)}</span>
        {isExceededTarget && (
          <Tooltip
            title="It exceeds the target amount"
            position="top"
            trigger="mouseenter"
            animation="fade"
            arrow={true}
          >
            <ExclamationCircleIcon className="h-5 w-5 text-red-500 ml-2" />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
