<template>
  <div class="row q-my-md">
    <div
      class="text-h6"
      style="display: flex;align-items: center;">
      {{ questionText }}
    </div>
    <q-checkbox
      toggle-indeterminate
      indeterminate-value="maybe"
      v-model="theModel2"/>
  </div>
</template>

<script>
  export default {
    props: {
      questionText: String,
    },
    data: () => ({
      theModel2: null
    }),
  }
</script>
