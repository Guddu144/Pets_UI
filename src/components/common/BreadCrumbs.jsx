import { classNames } from '../../utils';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const BreadCrumbs = ({ items }) => {
  return (
    <div className="block font-light text-sm text-gray-500 mt-1.5">
      {items.map((item, i) => (
        <Fragment key={i}>
          <Link
            to={item.link}
            className={classNames('hover:text-gray-500', i === items.length - 1 && 'text-gray-500')}
          >
            {item.label}
          </Link>
          {i !== items.length - 1 && (
            <span className="mx-1">/</span>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default BreadCrumbs;
