<template>
  <r-field
    :field="field"
  >
    <q-input
      ref="input"
      :value="value"
      @change="event => updateFieldDataOnChange(event.target.value)"
      :rules="moneyInputRules"
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

const minMoney = -922337203685477,
  maxMoney = 922337203685477

export default {
  components: {
    rField
  },
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
  data: () => ({
    moneyInputRules: [
      val => !(/,+/.test(val)) || 'Please use dot\'s instead comma\'s',
      val => !val || (/(^-?\d*?(\.\d{1,4})?$)/.test(val)) || 'Please use money format',
      val => !val || (val && val !== '' ? parseFloat(val) > minMoney && parseFloat(val) < maxMoney : null) ||
        `Please use money value between ${minMoney} and ${maxMoney}`
    ]
  }),
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
