<template>
  <r-filter
    :field="field"
    :filter="filter"
  >
    <q-input
      class="col-4"
      :value="filter.ValueFrom"
      :disable="!filter.Enable"
      :rules="moneyInputRules"
      @change="event => updateValueFrom(event.target.value)"
      outlined
      dense
      ref="inputFrom"
      :clearable="filter.ValueFrom !== filterOrigin.ValueFrom"
      @clear="resetFrom"
    />
    <q-space />
    <q-input
      class="col-4"
      :value="filter.ValueTo"
      :disable="!filter.Enable"
      :rules="moneyInputRules"
      @change="event => updateValueTo(event.target.value)"
      outlined
      dense
      ref="inputTo"
      :clearable="filter.ValueTo !== filterOrigin.ValueTo"
      @clear="resetTo"
    />
  </r-filter>
</template>

<script>
import { mapActions } from 'vuex'
import rFilter from './rFilter'

const minMoney = -922337203685477,
  maxMoney = 922337203685477

export default {
  components: {
    rFilter
  },
  computed: {
    moneyInputRules: {
      get: function () {
        return [
          val => (
            !(/,+/.test(val))
          ) || 'Please use dot\'s instead comma\'s',
          val => (
            !val
          ) || (
            /(^-?\d*?(\.\d{1,4})?$)/
              .test(val)
          ) || 'Please use money format',
          val => (
            !val
          ) || (
            val && val !== '' ? parseFloat(val) > minMoney && parseFloat(val) < maxMoney : null
          ) ||
            `Please use money value between ${minMoney} and ${maxMoney}`
        ]
      }
    }
  },
  props: {
    field: {
      type: Object,
      required: true
    },
    filter: {
      type: Object,
      required: true
    },
    filterOrigin: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions([
      'FILTER_STATE_UPDATE_FIELD'
    ]),
    resetFrom () {
      setTimeout(() => {
        this.$refs.inputFrom.resetValidation()
      })
      const filter = { ...this.filter }
      filter.ValueFrom = this.filterOrigin.ValueFrom
      const obj = { [`${this.field.Tag}`]: filter }
      this.FILTER_STATE_UPDATE_FIELD(obj)
    },
    updateValueFrom (eventValue) {
      const filter = { ...this.filter }
      filter.ValueFrom = eventValue
      const obj = { [`${this.field.Tag}`]: filter }
      this.FILTER_STATE_UPDATE_FIELD(obj)
    },
    resetTo () {
      setTimeout(() => {
        this.$refs.inputTo.resetValidation()
      })
      const filter = { ...this.filter }
      filter.ValueTo = this.filterOrigin.ValueTo
      const obj = { [`${this.field.Tag}`]: filter }
      this.FILTER_STATE_UPDATE_FIELD(obj)
    },
    updateValueTo (eventValue) {
      const filter = { ...this.filter }
      filter.ValueTo = eventValue
      const obj = { [`${this.field.Tag}`]: filter }
      this.FILTER_STATE_UPDATE_FIELD(obj)
    }
  }
}
</script>
