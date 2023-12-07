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

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

// axiosClient.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   (error) => {
//     console.log(error)
//     try {
//       const { response } = error
//       console.log(response)
//       // if (response.status === 401) {
//       //   console.log(response)
//       // }
//     } catch (e) {
//       console.log(e)
//     }

//     throw error
//   }
// )

export default axiosClient
