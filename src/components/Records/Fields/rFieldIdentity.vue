<template>
  <div class="row q-my-md">
    <div
      class="col-3 text-h6"
      style="display: flex;align-items: center;"
    >
      ID
    </div>
    <div class="col-9">
      <q-input
        class="text-body1"
        v-model="ID"
        outlined
        readonly
        dense
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ID: String
  }
}
</script>
