<template>
  <r-field :field="field">
    <q-input
      type="number"
      ref="input"
      :value="value"
      @change="event => updateFieldDataOnChange(event.target.value)"
      :rules="intInputRules"
      outlined
      dense
      clearable
      @clear="reset"
    />
  </r-field>
</template>

<script>
import rField from './rField'

const maxInt = Math.pow(2, 31) - 1,
  minInt = -Math.pow(2, 31)

export default {
  components: {
    rField
  },
  data: () => ({
    intInputRules: [
      val => (val !== null && val !== '') || 'Please input integer number',
      val => (/^-?\d*$/.test(val)) || 'Please use number format',
      val => (val >= minInt && val <= maxInt) || `Please use integer value between ${minInt} and ${maxInt}`
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
    },
    updateFieldDataOnChange (eventValue) {
      const field = this.field
      this.$store.dispatch('RECORD_STATE_UPDATE_INIT', [Number(eventValue), field])
    }
  }
}
</script>
