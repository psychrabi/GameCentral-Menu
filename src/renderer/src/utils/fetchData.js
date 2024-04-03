import axiosClient from '../lib/axios-client'

const handleRequest = async (method, endpoint, token, payload = null) => {
  const config = {
    method,
    url: endpoint,
    headers: { Authorization: `Bearer ${token}` }
  }
  if (payload) config.data = payload

  try {
    const { data } = await axiosClient(config)
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const fetchData = (endpoint, token) => handleRequest('get', endpoint, token)
export const submitData = (endpoint, token, payload) =>
  handleRequest('post', endpoint, token, payload)
export const updateData = (endpoint, token, payload) =>
  handleRequest('put', endpoint, token, payload)
