<template>
  <r-field :field="field">
    <q-input
      type="number"
      class="q-field--with-bottom"
      :value="value"
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
  props: {
    field: {
      type: Object,
      required: true
    },
    value: {
      type: Number,
      default: null
    }
  }
}
</script>
