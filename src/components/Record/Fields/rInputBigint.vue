<template>
  <r-field :field="field">
    <q-input
      type="number"
      ref="input"
      :value="value"
      :rules="bigintInputRules"
      @change="event => updateFieldOnChange(event.target.value)"
      outlined
      dense
      :clearable="value != originValue"
      @clear="updateFieldOnChange(originValue)"
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
      val => !val || /^(-?\d+)?$/.test(val) || 'Please use number format',
      val => (val >= minBigint && val <= maxBigint) || `Please use integer value between ${minBigint} and ${maxBigint}`

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
