<template>
  <div class="row q-my-md">
    <div
      class="col-3"
      @click="enable = !enable"
    >
      <q-toggle v-model="enable" />
      Money
    </div>
    <div class="col-4">
      <q-field
        ref="inputFrom"
        v-model="valueFrom"
        v-bind="$attrs"
        :rules="moneyInputRules"
        :disable="!enable"
        outlined
        dense
        clearable
        @clear="resetFrom"
      >
        <template #control="{ id, value, emitValue }">
          <input
            class="q-field__input text-right"
            v-money="moneyFormat"
            :value="value"
            @change="e => emitValue(e.target.value)"
            :id="id"
            autofocus
          >
        </template>
      </q-field>
    </div>
    <q-space />
    <div class="col-4">
      <q-field
        ref="inputTo"
        v-model="valueTo"
        v-bind="$attrs"
        :rules="moneyInputRules"
        :disable="!enable"
        outlined
        dense
        clearable
        @clear="resetTo"
      >
        <template #control="{ id, value, emitValue }">
          <input
            class="q-field__input text-right"
            v-money="moneyFormat"
            :value="value"
            @change="e => emitValue(e.target.value)"
            :id="id"
            autofocus
          >
        </template>
      </q-field>
    </div>
  </div>
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
    enable: false,
    valueFrom: null,
    valueTo: null,
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
    resetFrom () {
      this.valueFrom = null
      setTimeout(() => {
        this.$refs.inputFrom.resetValidation()
      })
    },
    resetTo () {
      this.valueTo = null
      setTimeout(() => {
        this.$refs.inputTo.resetValidation()
      })
    }
  },
  directives: {
    money: VMoney
  }
}
</script>
