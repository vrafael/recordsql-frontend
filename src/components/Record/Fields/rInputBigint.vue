<template>
  <r-field :field="field">
    <q-input
      type="number"
      ref="input"
      :value="value"
      :rules="bigintInputRules"
      outlined
      dense
      clearable
      @clear="reset"
    />
  </r-field>
</template>

<script>
import rField from './rField'

const maxBigint = Math.pow(2, 63) - 1,
  minBigint = -Math.pow(2, 63)

export default {
  components: {
    rField
  },
  data: () => ({
    bigintInputRules: [
      val => (val !== null && val !== '') || 'Please input integer number',
      val => (/^-?\d*$/.test(val)) || 'Please use number format',
      val => (val >= minBigint && val <= maxBigint) || `Please use integer value between ${minBigint} and ${maxBigint}`
    ]
  }),
  props: {
    field: {
      type: Object,
      required: true
    },
    value: {
      type: Number,
      default: null
    }
  },
  methods: {
    reset () {
      setTimeout(() => {
        this.$refs.input.resetValidation()
      })
    }
  }
}
</script>
