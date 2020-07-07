<template>
  <r-filter
    label="Float"
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
  data: () => ({
    intInputRules: [
      val => (val !== null && val !== '') || 'Please input float number',
      val => (/^-?\d*(.\d*)?$/.test(val)) || 'Please use float number format'
    ],
    enable: false,
    valueFrom: null,
    valueTo: null
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
