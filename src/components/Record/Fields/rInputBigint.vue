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
import { mapActions, mapGetters } from 'vuex'
import rField from './rField'

const maxBigint = Math.pow(2, 63) - 1,
  minBigint = -Math.pow(2, 63)

export default {
  components: {
    rField
  },
  data: () => ({
    bigintInputRules: [
      val => (val !== '') || 'Please input integer number',
      val => (/(^-?\d*$)?/.test(val)) || 'Please use number format',
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
  computed: {
    ...mapGetters(['RECORD_GET', 'RECORD_ORIGIN_GET'])
  },
  methods: {
    ...mapActions(['RECORD_STATE_UPDATE_FIELD']),
    reset () {
      const fieldTag = this.field.Tag.toString()
      setTimeout(() => {
        this.$refs.input.resetValidation()
      })
      const originValue = this.RECORD_ORIGIN_GET[fieldTag]
      const obj = { [`${this.field.Tag}`]: originValue }
      this.RECORD_STATE_UPDATE_FIELD(obj)
    },
    updateFieldDataOnChange (eventValue) {
      const obj = { [`${this.field.Tag}`]: Number(eventValue) }
      this.RECORD_STATE_UPDATE_FIELD(obj)
    },
    compareWithOriginValue () {
      const fieldTag = this.field.Tag.toString()
      const localState = JSON.stringify(this.RECORD_GET[fieldTag])
      const originState = JSON.stringify(this.RECORD_ORIGIN_GET[fieldTag])
      return localState !== originState
    }
  }
}
</script>
