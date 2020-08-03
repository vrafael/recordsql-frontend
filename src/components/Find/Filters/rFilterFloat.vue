<template>
  <r-filter
    :field="field"
    :enable.sync="enable"
  >
    <q-input
      class="col-4"
      type="number"
      v-model="valueFrom"
      :disable="!enable"
      :rules="intInputRules"
      outlined
      dense
      ref="inputFrom"
      clearable
      @clear="resetFrom"
    />
    <q-space />
    <q-input
      class="col-4"
      type="number"
      v-model="valueTo"
      :disable="!enable"
      :rules="intInputRules"
      outlined
      dense
      ref="inputTo"
      clearable
      @clear="resetTo"
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
    intInputRules: [
      val => (val !== null && val !== '') || 'Please input float number',
      val => (/(^-?\d*(.\d*)?$)?/.test(val)) || 'Please use float number format'
    ]
  }),
  methods: {
    resetFrom () {
      setTimeout(() => {
        this.$refs.inputFrom.resetValidation()
      })
    },
    resetTo () {
      setTimeout(() => {
        this.$refs.inputTo.resetValidation()
      })
    }
  }
}
</script>
