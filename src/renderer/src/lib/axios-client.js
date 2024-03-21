import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://gamecentralmenu.test/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

axiosClient.interceptors.response.use(
  response => response,
  error => {
    const { response } = error
    if(response) {
      console.error('Response error:', response)
    } else {
      console.error('Error without response:', error)
    }
    return Promise.reject(error)
  }
)

export default axiosClient

