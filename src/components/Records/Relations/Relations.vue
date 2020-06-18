<template>
  <q-page padding class="flex justify-center">
    <div class="row full-width" style="max-width: 1000px">
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
    </div>
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
