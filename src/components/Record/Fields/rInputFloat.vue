<template>
  <r-field :field="field">
    <q-input
      ref="input"
      :value="value"
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
