import axiosClient from '../lib/axios-client'

const handleRequest = async (method, endpoint, token, payload = null) => {
  try {
    const response = await axiosClient({
      method: method,
      url: endpoint,
      headers: { Authorization: `Bearer ${token}` },
      data: payload
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchData = (endpoint, token) => handleRequest('get', endpoint, token);
export const submitData = (endpoint, token, payload) => handleRequest('post', endpoint, token, payload);
export const updateData = (endpoint, token, payload) => handleRequest('put', endpoint, token, payload);

