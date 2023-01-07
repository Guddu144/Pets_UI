import request from './request';

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = payload => {
  const data={
    username: payload.username,
    password: payload.password,
  }
  return request('POST', `${API_URL}/api/login`,false, data);
};

export const addUser = payload => {

  return request('POST', `${API_URL}/api/signup`, false, {
    username: payload.username,
    email: payload.email,
    password: payload.password,
    // eslint-disable-next-line camelcase
    confirm_password: payload.confirmPassword,
  });
};
