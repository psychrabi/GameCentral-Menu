import axios from 'axios'

const axiosClient = axios.create({
  baseURL: `http://gamecentralmenu.test/api`
})

axiosClient.interceptors.request.use((config) => {
  config.headers.Accept = 'application/json'
  config.headers['Content-Type'] = 'application/json'
  config.headers['Access-Control-Allow-Origin'] = '*'
  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log(error)
    try {
      const { response } = error
      console.log(response)
      // if (response.status === 401) {
      //   console.log(response)
      // }
    } catch (e) {
      console.log(e)
    }

    throw error
  }
)

export default axiosClient
