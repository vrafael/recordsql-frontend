<template>
  <r-field
    :field="field"
  >
    <q-input
      type="number"
      ref="input"
      :value="value"
      @change="event => updateFieldDataOnChange(event.target.value)"
      :rules="intInputRules"
      outlined
      dense
      :clearable="compareWithOriginValue()"
      @clear="() => reset()"
    />
  </r-field>
</template>

<script>
import { mapActions } from 'vuex'
import rField from './rField'

const maxInt = Math.pow(2, 31) - 1,
  minInt = -Math.pow(2, 31)

export default {
  components: {
    rField
  },
  data: () => ({
    intInputRules: [
      val => (
        /(^-?\d*$)?/
          .test(val)
      ) || 'Please use number format',
      val => (
        val >= minInt && val <= maxInt
      ) || `Please use integer value between ${minInt} and ${maxInt}`
    ]
  }),
  props: {
    field: {
      type: Object,
      required: true
    },
    value: {
      type: [String, null],
      default: null
    },
    originValue: {
      type: [String, null],
      default: null
    }
  },
  methods: {
    ...mapActions([
      'RECORD_STATE_UPDATE_FIELD'
    ]),
    reset () {
      this.$refs.input.resetValidation()
      const obj = { [`${this.field.Tag}`]: this.originValue }
      this.RECORD_STATE_UPDATE_FIELD(obj)
    },
    updateFieldDataOnChange (eventValue) {
      const obj = { [`${this.field.Tag}`]: eventValue }
      this.RECORD_STATE_UPDATE_FIELD(obj)
    },
    compareWithOriginValue () {
      return JSON.stringify(this.value) !== JSON.stringify(this.originValue)
    }
  }
}
</script>
