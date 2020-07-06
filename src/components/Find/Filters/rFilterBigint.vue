<template>
  <r-filter
    label="Bigint"
    :enable.sync="enable"
  >
    <q-input
      class="col-4"
      type="number"
      v-model="valueFrom"
      :disable="!enable"
      :rules="bigintInputRules"
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
      :rules="bigintInputRules"
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

const maxBigint = Math.pow(2, 63) - 1,
  minBigint = -Math.pow(2, 63)

export default {
  components: {
    rFilter
  },
  data: () => ({
    bigintInputRules: [
      val => (val !== null && val !== '') || 'Please input integer number',
      val => (/^-?\d*$/.test(val)) || 'Please use number format',
      val => (val > minBigint && val < maxBigint) || 'Please use big integer value between -2^63 and 2^63-1'
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
