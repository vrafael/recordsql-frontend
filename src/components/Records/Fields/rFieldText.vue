<template>
  <div class="row q-my-md">
    <div
      class="col-3 text-h6"
      style="display: flex;align-items: center;"
    >
      Document text
    </div>
    <div class="col-9">
      <q-input
        type="textarea"
        class="text-body1"
        v-model="text"
        dense
        outlined
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: String
  }
}
</script>
