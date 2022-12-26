import React from 'react';

const Icon = ({ icon, ...props }) => {
  return (
    <img src={icon}
      {...props} />
  )
}

export default Icon;
