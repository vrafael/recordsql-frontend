<template>
  <r-field label="Float">
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
  </r-field>
</template>

<script>
import rField from './rField'

export default {
  components: {
    rField
  },
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
