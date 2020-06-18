<template>
  <q-page class="flex justify-center">
    <q-row class="row full-width" style="max-width: 1000px">
      <div class="col-12 q-mx-auto">
        <q-card class="q-mx-xs">

          <q-card-section>
            <r-header/>
            <r-tabs/>
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
  import rTabs from 'components/Records/rTabs'
  import rHeader from 'components/Records/rHeader'

  export default {
    components: {
      rTabs,
      rHeader,
    }
  }
</script>
