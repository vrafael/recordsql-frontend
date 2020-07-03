<template>
  <div class="row q-my-md">
    <div
      class="col-3 text-h6"
      style="display: flex;align-items: center;"
    >
      Int
    </div>
    <div class="col-9">
      <q-input
        dense
        outlined
        v-model="integer"
        mask="#"
        reverse-fill-mask
        input-class="text-right text-h6"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    integer: String
  }
}
</script>

<style scoped>

</style>
