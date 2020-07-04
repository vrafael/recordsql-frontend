<template>
  <q-input
    type="number"
    v-model="value"
    :rules="intInputRules"
    outlined
    dense
    ref="input"
    clearable
    @clear="reset"
  />
</template>

<script>
export default {
  data: () => ({
    intInputRules: [
      val => (val !== null && val !== '') || 'Please input float number',
      val => (/^-?\d*(.\d*)?$/.test(val)) || 'Please use float number format'
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
