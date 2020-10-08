<template>
  <r-field :field="field">
    <q-input
      ref="input"
      :value="value"
      @change="event => updateFieldOnChange(event.target.value)"
      :rules="floatInputRules"
      outlined
      dense
      :clearable="value !== originValue"
      @clear="updateFieldOnChange(originValue)"
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
      val => !val || /^(-?\d+(\.\d+)?)?$/.test(val) || 'Please use float number format'
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
