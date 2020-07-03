<template>
  <q-input
    type="number"
    class="q-field--with-bottom"
    v-model="value"
    outlined
    dense
    readonly
  />
</template>

<script>
export default {
  data: () => ({
    value: null
  })
}
</script>
