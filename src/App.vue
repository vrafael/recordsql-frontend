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
      Notify.create(err)
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
