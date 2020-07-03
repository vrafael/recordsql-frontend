import axios from 'axios'

export async function fetchApiRPC (method = '', params = {}) {
  return axios.post('/api/rpc/', {
    method: method.toString(),
    params: params || {}
  }).then(response => {
    if (response.status !== 200) {
      console.groupCollapsed('/api/rpc internal service error')
      console.error(response)
      console.info(response)
      console.groupEnd()
    } else if (response.data.error) {
      const { error } = response.data
      console.groupCollapsed(`/api/rpc request error with code:${error.code}`)
      console.error(error.message)
      console.info(response)
      console.groupEnd()
    } else {
      return response.data.result
    }
  }).catch(error => {
    console.groupCollapsed('/api/rpc connection error')
    console.error(error)
    console.groupEnd()
  })
}
