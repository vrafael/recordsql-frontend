<template>
  <r-field :field="field">
    <q-input
      type="number"
      ref="input"
      :value="value"
      @change="event => updateFieldOnChange(event.target.value)"
      :rules="intInputRules"
      outlined
      dense
      :clearable="value !== originValue"
      @clear="updateFieldOnChange(originValue)"
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
      val => !val || /^(-?\d+)?$/.test(val) || 'Please use number format',
      val => (val >= minInt && val <= maxInt) || `Please use integer value between ${minInt} and ${maxInt}`
    ]
  }),
  props: {
    field: {
      type: Object,
      required: true
    },
    value: {
      type: [Number, String],
      default: null
    },
    originValue: {
      type: [Number, String],
      default: null
    },
    change: {
      type: Function,
      required: true
    }
  },
  methods: {
    updateFieldOnChange (eventValue) {
      this.change({ [`${this.field.Tag}`]: eventValue })
    }
  }
}
</script>
