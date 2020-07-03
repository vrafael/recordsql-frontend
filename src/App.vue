<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
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
