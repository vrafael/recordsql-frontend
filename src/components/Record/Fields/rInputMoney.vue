<template>
  <r-field :field="field">
    <q-input
      ref="input"
      :value="value"
      @change="event => updateFieldDataOnChange(event.target.value)"
      :rules="moneyInputRules"
      outlined
      dense
      :clearable="value !== originValue"
      @clear="() => updateFieldDataOnChange(originValue)"
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
      type: [Number, String],
      default: null
    },
    originValue: {
      type: [Number, String],
      default: null
    }
  },
  data: () => ({
    moneyInputRules: [
      val => !val || /^(-?\d+(\.\d{1,4})?)?$/.test(val) || 'Please use money format',
      val => !val || (parseFloat(val) > minMoney && parseFloat(val) < maxMoney) ||
        `Please use money value between ${minMoney} and ${maxMoney}`
    ]
  }),
  methods: {
    ...mapActions([
      'RECORD_STATE_UPDATE_FIELD'
    ]),
    updateFieldDataOnChange (eventValue) {
      const obj = { [`${this.field.Tag}`]: eventValue }
      this.RECORD_STATE_UPDATE_FIELD(obj)
    }
  }
}
</script>
