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
import rField from './rField'

const maxBigint = Math.pow(2, 63) - 1,
  minBigint = -Math.pow(2, 63)

export default {
  components: {
    rField
  },
  data: () => ({
    bigintInputRules: [
      val => (val !== null && val !== '') || 'Please input integer number',
      val => (/^-?\d*$/.test(val)) || 'Please use number format',
      val => (val >= minBigint && val <= maxBigint) || `Please use integer value between ${minBigint} and ${maxBigint}`
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
      const fieldTag = this.field.Tag.toString()
      setTimeout(() => {
        this.$refs.input.resetValidation()
      })
      const originValue = this.$store.getters.RECORD_ORIGIN_GET[fieldTag]
      this.$store.dispatch('RECORD_STATE_UPDATE_INIT', [originValue, this.field])
    },
    updateFieldDataOnChange (eventValue) {
      const field = this.field
      this.$store.dispatch('RECORD_STATE_UPDATE_INIT', [Number(eventValue), field])
    },
    compareWithOriginValue () {
      const fieldTag = this.field.Tag.toString()
      const localState = JSON.stringify(this.$store.getters.RECORD_GET[fieldTag])
      const originState = JSON.stringify(this.$store.getters.RECORD_ORIGIN_GET[fieldTag])
      return localState !== originState
    }
  }
}
</script>
