import { removeEmpty } from '../utils';

const request = async (method, url, includeAuth, params = {}) => {
  const req = {
    method: method,
    headers: {
      'Accept': 'application/json',
    },
  };

  if (includeAuth) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    req.headers={
      ...req.headers,
      'x-user':localStorage.getItem('roleId'),
    }
  }

  if (method === 'GET') {
    const getParams = new URLSearchParams(removeEmpty(params));
    url += `?${getParams}`;
  } else if (params instanceof FormData) {
    req.body = params;
  } else {
    req.headers['Content-Type'] = 'application/json';
    req.body = JSON.stringify(removeEmpty(params));
  }

  const res = await fetch(url, req);
  const data = await res.json();
  if (res.failed || !res.ok) {
    throw new ResponseError('error_msg' in data ? data.error_msg : data.message, data.errors);
  }

  return data;
};

class ResponseError extends Error {
  constructor(msg, errors) {
    super(msg);
    this.errors = errors;
  }
}

export default request;
