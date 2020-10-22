<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { ApiRpcError } from './common/service.api.rpc'
import { Notify } from 'quasar'

export default {
  name: 'App',
  errorCaptured (err, vm, info) {
    if (err instanceof ApiRpcError) {
      Notify.create({ message: err.message, type: err.type, timeout: err.timeout, progress: true })
    } else {
      console.groupCollapsed('Application error')
      console.error(err)
      console.info(info)
      console.groupEnd()
      Notify.create({ type: 'negative', message: err.message })
    }
    return false
  }
}
</script>

<style lang="scss">
.q-notification__message {
  white-space: pre-wrap;
}
</style>
