<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import showNotify from './common/service.notify'
import { ApiRpcError } from './common/service.api.rpc'

export default {
  name: 'App',
  errorCaptured (err, vm, info) {
    if (err instanceof ApiRpcError) {
      showNotify(err)
    } else {
      console.groupCollapsed('Application error')
      console.error(err)
      console.info(info)
      console.groupEnd()
      const notify = { code: 400, message: err.message }
      showNotify(notify)
    }
    return false
  }
}
</script>
