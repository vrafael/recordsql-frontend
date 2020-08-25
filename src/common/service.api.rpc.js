import axios from 'axios'

export default async function fetchApiRPC (method, params) {
  const request = {
    method,
    params
  }
  return axios.post('/api/rpc/', request).then(response => {
    if (response.status !== 200) {
      console.groupCollapsed('/api/rpc internal service error')
      console.error(response)
      console.info(request)
      console.info(response)
      console.groupEnd()
      throw new ApiRpcError({ message: response.statusText })
    } else if (response.data.error) {
      const { error } = response.data
      const errorMessage = response.data.error.message
      const errorCode = response.data.error.code
      console.groupCollapsed(`/api/rpc request error with code:${errorCode}`)
      console.error(error)
      console.info(request)
      console.info(response.data)
      console.groupEnd()
      throw new ApiRpcError({ message: errorMessage })
    } else if (response.data) {
      return response.data.result
    }
    return true
  })
}

export class ApiRpcError extends Error {
  constructor ({ message, notifyType = 'defaultError', displayTimeMS = 5000 }) {
    super(message)
    this.name = 'ApiRpcError'
    this.message = message
    this.notifyType = notifyType
    this.displayTimeMS = displayTimeMS
  }
}
