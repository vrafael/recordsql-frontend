<template>
  <div class="row q-my-md">
    <div class="col-3 text-h6" style="display: flex;align-items: center;">
      Enter the number
    </div>
    <div class="col-9">
      <q-input
        v-model="integer"
        mask="#"
        fill-mask="0"
        reverse-fill-mask
        input-class="text-right text-h6"
      />
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      integer: 0,
    }),
  }
</script>

<style scoped>

</style>
