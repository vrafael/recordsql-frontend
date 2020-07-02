<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'App',
  async mounted() {
    await this.$store.dispatch('fetchTypeMetaDataObj', 9)
    console.log('test: ', this.$store.getters.getMetaDataObj)
  },
  // async mounted() {
  //   await this.$store.dispatch('fetchTypeListArr',)
  //   console.log('test: ', this.$store.getters.getTypeListArr)
  // },

}
</script>
