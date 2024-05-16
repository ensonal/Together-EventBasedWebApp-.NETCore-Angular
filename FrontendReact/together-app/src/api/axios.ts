import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:7241/'
});

function getHeaders() {
  var myToken = 'Bearer ' + localStorage.getItem('jwToken');
  const headers = {
    Authorization: myToken
  };
  return headers;
}

export async function request(
  requestType: string,
  url: string,
  body?: any,
  withoutHeader?: boolean
) {
  if (requestType === 'get') {
    await get(url, body);
  }
  if (requestType === 'get' && withoutHeader === true) {
    await getWithout(url);
  }
  if (requestType === 'post') {
    await post(url, body);
  }
  if (requestType === 'put') {
    await put(url, body);
  }
}

export async function post(url: string, body?: any) {
  var headers = getHeaders();
  const { data } = await axiosInstance.post(url, body, { headers });
  if (data.succeeded === true) {
    return data;
  }
  return data;
}

export async function postWithAddHeader(url: string, body?: any, headers?: any) {
  const { data } = await axiosInstance.post(url, body, {headers});
  if (data.succeeded === true) {
    return data;
  }
  return data;
}

export async function deleted(url: string) {
  var headers = getHeaders();
  const { data } = await axiosInstance.delete(url, { headers });
  if (data.succeeded === true) {
    return data;
  }
  return data.Message;
}

export async function get(url: string, body?: string) {
  var headers = getHeaders();
  const { data } = await axiosInstance.get(url, { headers });
  if (data.succeeded === true) {
    return data;
  }
  return data;
}

export async function getWithout(url: string) {
  const { data } = await axiosInstance.get(url);
  if (data.succeeded === true) {
    return data;
  }
  return data.Message;
}

export async function put(url: string, body?: any) {
  var headers = getHeaders();
  const { data } = await axiosInstance.put(url, body, { headers });
  if (data.succeeded === true) {
    return data;
  }
  return data.Message;
}
export default axiosInstance;
