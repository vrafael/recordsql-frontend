<template>
  <r-filter
    :field="field"
    :enable.sync="enable"
  >
    <q-input
      ref="input"
      class="col-9 q-field--with-bottom"
      v-model="value"
      :disable="!enable"
      outlined
      dense
      clearable
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
    value: null
  })
}
</script>
