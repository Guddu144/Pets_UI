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
export const getParty = payload => request('GET', `${API_URL}/api/party`, true, payload);
export const partyTable = () => request('GET', `${API_URL}/api/party`, true);

export const chartDataIncome = () => {
  const data = {
    type: 'income',
  }
  return request('GET', `${API_URL}/api/chart`, true, data);
}

export const chartDataExpense = () => {
  const data = {
    type: 'expense',
  }
  return request('GET', `${API_URL}/api/chart`, true, data);
}
export const addEarning = payload => {
  const data = {
    ...payload,
    type: 'income',
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
export const fetchExpense = () => {
  const data = {
    type: 'expense',
  }
  return request('GET', `${API_URL}/api/finance`, true, data);
}
export const fetchEarning = () => {
  const data = {
    type: 'income',
  }
  return request('GET', `${API_URL}/api/finance`, true, data);
}

export const addTranscationn = payload => request('POST', `${API_URL}/api/transaction`, true, payload);
export const fetchTranscationn = () => request('GET', `${API_URL}/api/transaction`, true);
export const fetchCategory = () => request('GET', `${API_URL}/api/category`, true);
export const getDashboardDetail = () => request('GET', `${API_URL}/api/dashboard`, true);
export const addGoal = payload => request('POST', `${API_URL}/api/goal`, true, payload);
export const fetchGoal = () => request('GET', `${API_URL}/api/goal`, true);
