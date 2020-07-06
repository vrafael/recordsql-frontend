<template>
  <q-input
    type="number"
    ref="input"
    v-model="value"
    :rules="floatInputRules"
    outlined
    dense
    clearable
    @clear="reset"
  />
</template>

<script>
export default {
  data: () => ({
    floatInputRules: [
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
