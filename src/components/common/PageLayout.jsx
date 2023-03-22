import React from 'react';

const PageLayout = ({ className, children }) => {
  return (
    <div className={className}>
      <div className="container mx-auto bg-white">
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
