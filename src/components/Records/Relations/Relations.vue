<template>
  <q-page class="flex">
    <q-row class="full-width" style="max-width: 1500px">
      <div class="col-12 q-mx-auto">
        <q-card class="q-mx-xs">

          <q-card-section>
            <Header/>
            <Tabs/>
          </q-card-section>
          <!--        <q-page-container>-->
          <!--          <router-view/>-->
          <!--        </q-page-container>-->
        </q-card>
      </div>
    </q-row>
  </q-page>
</template>

<script>
  import Tabs from 'components/Records/Tabs'
  import Header from 'components/Records/Header'

  export default {
    components: {
      Tabs,
      Header,
    }
  }
</script>

<style scoped>

</style>
