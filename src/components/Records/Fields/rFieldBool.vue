<template>
  <div class="row q-my-md">
    <div class="col-3 text-h6" style="display: flex;align-items: center;">
      Check the box
    </div>
    <div class="col-9">
        <q-checkbox
          slot="prepend"
          toggle-indeterminate
          indeterminate-value="maybe"
          v-model="theModel2"/>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      theModel2: null
    }),
  }
</script>
