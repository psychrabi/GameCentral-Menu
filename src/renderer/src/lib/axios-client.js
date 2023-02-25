import axios from 'axios'

const axiosClient = axios.create({
  baseURL: `http://gamecentralmenu.test/api`
})

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN')
  config.headers.Authorization = `Bearer ${token}`
  config.headers.Accept = 'application/json'
  config.headers['Content-Type'] = 'application/json'
  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    try {
      const { response } = error
      if (response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN')
      }
    } catch (e) {
      console.log(e)
    }

    throw error
  }
)

export default axiosClient
