import axios from 'axios'
import showNotify from './service.notify'

export default async function fetchApiRPC (method, params) {
  return axios.post('/api/rpc/', {
    method,
    params
  }).then(response => {
    if (response.status !== 200) {
      const errorMessage = response.data.error.message
      const errorCode = response.data.error.code
      showNotify({
        errorMessage: errorMessage,
        errorCode: errorCode,
        displayTimeMS: 5000
      })
      console.groupCollapsed('/api/rpc internal service error')
      console.error(response)
      console.info(response)
      console.groupEnd()
    } else if (response.data.error) {
      const { error } = response.data
      const errorMessage = response.data.error.message
      const errorCode = response.data.error.code
      showNotify({
        errorMessage: errorMessage,
        errorCode: errorCode,
        displayTimeMS: 5000
      })
      console.groupCollapsed(`/api/rpc request error with code:${error.code}`)
      console.error(error)
      console.info(response)
      console.groupEnd()
    } else {
      return response.data.result
    }
  }).catch(error => {
    showNotify({
      errorMessage: error,
      displayTimeMS: 5000
    })
    console.groupCollapsed('/api/rpc connection error')
    console.error(error)
    console.groupEnd()
  })
}
