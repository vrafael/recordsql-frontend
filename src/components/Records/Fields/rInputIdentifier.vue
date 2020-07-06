<template>
  <r-field label="Identifier">
    <q-input
      type="number"
      class="q-field--with-bottom"
      v-model="value"
      outlined
      dense
      readonly
    />
  </r-field>
</template>

<script>
import rField from './rField'

export default {
  components: {
    rField
  },
  data: () => ({
    value: null
  })
}
</script>
