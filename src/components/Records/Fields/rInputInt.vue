<template>
  <q-input
    type="number"
    v-model="value"
    :rules="intInputRules"
    outlined
    dense
    clearable
    @clear="reset"
  />
</template>

<script>
const maxInt = Math.pow(2, 31) - 1,
  minInt = -Math.pow(2, 31)

export default {
  data: () => ({
    intInputRules: [
      val => (val !== null && val !== '') || 'Please input integer number',
      val => (/^-?\d*$/.test(val)) || 'Please use number format',
      val => (val >= minInt && val <= maxInt) || `Please use integer value between ${minInt} and ${maxInt}`
    ],
    value: null
  }),
  methods: {
    reset () {
      setTimeout(() => {
        this.$refs.input.resetValidation()
      })
    }
  }
}
</script>
