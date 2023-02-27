import axiosClient from '../lib/axios-client'
import { saveToLocalStorage } from './saveToLocalStorage'

export const sortByName = (data) => {
  return data?.sort((a, b) => a.name.localeCompare(b.name))
}

export const filterBySearch = (data, search) => {
  return search !== ''
    ? data?.filter((g) => g.name.toLowerCase().includes(search.toLowerCase()))
    : data
}

export const filterByCategory = (data, type, column) => {
  return type === '' ? data : data?.filter((item) => item[column] === type)
}

export const fetchData = async (endpoint, token) => {
  try {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const { data } = await axiosClient.get(endpoint)
    saveToLocalStorage('data', data)
    return data
  } catch (error) {
    console.log(error)
  }
}
