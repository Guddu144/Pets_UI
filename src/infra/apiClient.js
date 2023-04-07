import request from './request';

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = payload => {
  const data = {
    username: payload.username,
    password: payload.password,
  }
  return request('POST', `${API_URL}/api/login`, false, data);
};

export const addUser = payload => {

  return request('POST', `${API_URL}/api/signup`, false, {
    username: payload.username,
    email: payload.email,
    password: payload.password,
    // eslint-disable-next-line camelcase
    confirmPassword: payload.confirmPassword,
  });
};

export const forgetPassword = payload => request('POST', `${API_URL}/api/user/forgotPassword`, false, payload);
export const updatePassword = (payload, id, token) => request('POST', `${API_URL}/api/reset/${id}/${token}`, false, payload);
// http://localhost:3000/api/reset/2/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODAyNjg4NjgsImV4cCI6MTY4MDMzNzI2OH0.ZS0YnrsdDfL76zfrvQDrHmo1ZPAs45hgW7R8iS-nNgs
