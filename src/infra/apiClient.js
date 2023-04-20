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

export const addParty = payload => request('POST', `${API_URL}/api/party`, true, payload);

export const chartData = () => {
  const data = {
    type: 'expense',
  }
  return request('GET', `${API_URL}/api/chart?type=expense`, true, data);
}

export const addEarning = payload => {
  const data = {
    ...payload,
    type: 'earning',
  }
  return request('POST', `${API_URL}/api/finance`, true, data);
}
export const addExpense = payload => {
  const data = {
    ...payload,
    type: 'expense',
  }
  return request('POST', `${API_URL}/api/finance`, true, data);
}

