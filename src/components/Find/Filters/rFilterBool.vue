<template>
  <r-filter
    :field="field"
    :enable.sync="enable"
  >
    <q-checkbox
      toggle-indeterminate
      indeterminate-value="null"
      v-model="value"
      :disable="!enable"
      :label="value.toString().toUpperCase()"
      dense
    />
  </r-filter>
</template>

<script>
import rFilter from './rFilter'

export default {
  components: {
    rFilter
  },
  props: {
    field: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    enable: false,
    value: false
  })
}
</script>
