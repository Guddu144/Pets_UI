/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Auth = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  } else {
    return (
      <>
        <Outlet />
      </>
    );
  }
}

export default Auth;
