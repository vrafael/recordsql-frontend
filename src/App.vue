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
      const notify = { code: 400, message: err.message }
      showNotify(notify)
    }
    return false
  }
  // async mounted () {
  //   await this.$store.dispatch('TYPE_METADATA_FETCH', 9)
  //   console.log('test: ', this.$store.getters.TYPE_METADATA_GET)
  // }
  // async mounted() {
  //   await this.$store.dispatch('TYPE_LIST_FETCH',)
  //   console.log('test: ', this.$store.getters.TYPE_LIST_GET)
  // },
}
</script>
