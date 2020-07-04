<template>
  <q-field
    ref="input"
    v-model="value"
    v-bind="$attrs"
    :rules="moneyInputRules"
    outlined
    dense
    clearable
    @clear="reset"
  >
    <template #control="{ id, value, emitValue }">
      <input
        class="q-field__input"
        v-money="moneyFormat"
        :value="value"
        @change="e => emitValue(e.target.value)"
        :id="id"
      >
    </template>
  </q-field>
</template>

<script>
import { VMoney } from 'v-money'

const minMoney = -922337203685477,
  maxMoney = 922337203685477

export default {

  data: () => ({
    moneyInputRules: [
      val => (val !== null && val !== '') || 'Please input money value',
      val => (/^-?\d{1,3}(,\d{3})*?(\.\d{1,4})?$/.test(val)) || 'Please use money format',
      val => (parseFloat(val.replace(',', '')) > minMoney && parseFloat(val.replace(',', '')) < maxMoney) || `Please use money value between ${minMoney} and ${maxMoney}`
    ],
    value: null,
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
  directives: {
    money: VMoney
  }
}
</script>
