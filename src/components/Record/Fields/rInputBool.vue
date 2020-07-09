<template>
  <r-field :field="field">
    <q-checkbox
      class="q-field--with-bottom"
      toggle-indeterminate
      indeterminate-value="null"
      :value="value"
      :label="label"
      dense
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
      type: Boolean,
      default: null
    }
  },
  computed: {
    label: function () {
      return this.value ? this.value.toString().toUpperCase() : 'NULL'
    }
  }
}
</script>
