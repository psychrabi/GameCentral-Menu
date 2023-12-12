import axiosClient from '../lib/axios-client'

export const fetchData = async (endpoint, token) => {
  try {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const { data } = await axiosClient.get(endpoint)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const submitData = async (endpoint, token, payload) => {
  try {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const { data } = await axiosClient.post(endpoint, payload)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const updateData = async (endpoint, token, payload) => {
  try {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const { data } = await axiosClient.put(endpoint, payload)
    return data
  } catch (error) {
    console.log(error)
  }
}
