<template>
  <r-field :field="field">
    <q-input
      type="number"
      ref="input"
      :value="value"
      :rules="bigintInputRules"
      @change="event => updateFieldDataOnChange(event.target.value)"
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

const maxBigint = Math.pow(2, 63) - 1,
  minBigint = -Math.pow(2, 63)

export default {
  components: {
    rField
  },
  data: () => ({
    bigintInputRules: [
      val => (
        val !== ''
      ) || 'Please input integer number',
      val => (
        /(^-?\d*$)?/
          .test(val)
      ) || 'Please use number format',
      val => (
        val >= minBigint && val <= maxBigint
      ) || `Please use integer value between ${minBigint} and ${maxBigint}`

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
