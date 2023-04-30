import React, { useEffect, useState } from 'react';
import { classNames, formatCurrency } from '../../utils';

const Card = ({ className, title, icon, value }) => {

  return (
    <div className="grid p-8 bg-white border border-gray-200 shadow-lg rounded-lg md:mb-5">
      <div className="grid grid-cols-3">
        <div className="my-auto ml-auto mr-5">
          <div className={classNames('h-14 w-14  rounded-full flex items-center justify-center', className)}>
            <div className={'h-5 w-5'}>
              {icon}
            </div>
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-1 ">
          <h5 className="text-slate-400 text-base">{title}</h5>
          <span className="font-semibold text-lg">{formatCurrency(value)}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
