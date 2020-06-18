<template>
  <div class="record__tabs">
    <div class="row">
      <q-tabs
        v-model="tab"
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-route-tab exact to="/records/fields" name="fields" label="Fields"/>
        <q-route-tab exact to="/records/relations" name="relations" label="Relations"/>
      </q-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tab: 'mails'
      }
    }
  }
</script>

<style>
</style>
