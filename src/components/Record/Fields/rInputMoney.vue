<template>
  <r-field :field="field">
    <q-field
      ref="input"
      :value="value"
      :rules="moneyInputRules"
      v-bind="$attrs"
      outlined
      dense
      clearable
      @clear="reset"
    >
      <template #control="{ id, emitValue }">
        <input
          class="q-field__input"
          v-money="moneyFormat"
          :value="value"
          @change="e => emitValue(e.target.value)"
          :id="id"
        >
      </template>
    </q-field>
  </r-field>
</template>

<script>
import rField from './rField'
import { VMoney } from 'v-money'

const minMoney = -922337203685477,
  maxMoney = 922337203685477

export default {
  components: {
    rField
  },
  data: () => ({
    moneyInputRules: [
      val => (val !== null && val !== '') || 'Please input money value',
      val => (/^-?\d{1,3}(,\d{3})*?(\.\d{1,4})?$/.test(val)) || 'Please use money format',
      val => (parseFloat(val.replace(',', '')) > minMoney && parseFloat(val.replace(',', '')) < maxMoney) || `Please use money value between ${minMoney} and ${maxMoney}`
    ],
    moneyFormat: {
      decimal: '.',
      thousands: ',',
      prefix: '',
      suffix: '',
      precision: 2,
      masked: false
    }
  }),
  methods: {
    reset () {
      this.value = null
      setTimeout(() => {
        this.$refs.input.resetValidation()
      })
    }
  },
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
  directives: {
    money: VMoney
  }
}
</script>
