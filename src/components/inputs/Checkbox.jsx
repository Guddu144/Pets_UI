import React, { useRef, useEffect } from 'react';
import { classNames } from '../../utils';

const Checkbox = ({ className, indeterminate, ...props }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    if (!resolvedRef.current) return;
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <input
      ref={resolvedRef}
      type="checkbox"
      value="" // forcing checkbox input to be a controlled component
      className={classNames(
        'focus:ring-blue-500 h-4 w-4 text-blue-500 border-gray-300 rounded indeterminate:bg-blue-500',
        'disabled:opacity-50 disabled:bg-gray-200',
        className,
      )}
      {...props}
    />
  );
};

export default React.forwardRef(Checkbox);
