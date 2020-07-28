<template>
  <r-field :field="field">
    <q-field
      ref="input"
      :value="value"
      :rules="moneyInputRules"
      v-bind="$attrs"
      outlined
      dense
      :clearable="compareWithOriginValue()"
      @clear="() => reset()"
    >
      <template #control="{ id, emitValue }">
        <input
          class="q-field__input"
          v-money="moneyFormat"
          :value="value"
          @change="event => onChange(emitValue, event)"
          :id="id"
        >
      </template>
    </q-field>
  </r-field>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
      val => (val > minMoney && val < maxMoney) || `Please use money value between ${minMoney} and ${maxMoney}`
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
  computed: {
    ...mapGetters(['RECORD_GET', 'RECORD_ORIGIN_GET'])
  },
  methods: {
    ...mapActions(['RECORD_STATE_UPDATE_INIT']),
    reset () {
      const fieldTag = this.field.Tag.toString()
      setTimeout(() => {
        this.$refs.input.resetValidation()
      })
      const originValue = this.RECORD_ORIGIN_GET[fieldTag]
      const obj = { [`${this.field.Tag}`]: originValue }
      this.RECORD_STATE_UPDATE_INIT(obj)
    },
    onChange (emitValue, event) {
      const val = parseFloat(event.target.value.replace(/,/g, ''))
      emitValue(val)
      const obj = { [`${this.field.Tag}`]: val }
      this.RECORD_STATE_UPDATE_INIT(obj)
    },
    compareWithOriginValue () {
      const fieldTag = this.field.Tag.toString()
      const localState = JSON.stringify(this.RECORD_GET[fieldTag])
      const originState = JSON.stringify(this.RECORD_ORIGIN_GET[fieldTag])
      return localState !== originState
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
