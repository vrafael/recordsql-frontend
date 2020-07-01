<template>
  <div id="q-app">
<!--    <router-view />-->
    {{ getTypeListArr }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  mounted() {
    this.$store.dispatch('fetchTypeListArr')
  },
  computed: mapGetters([
  'getTypeListArr'
  ])
}
</script>
