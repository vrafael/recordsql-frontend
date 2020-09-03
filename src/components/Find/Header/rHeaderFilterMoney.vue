<template>
  <r-header-filter
    :field="field"
    :filter="filter"
    :filter-update="filterUpdate"
  >
    <q-input
      class="col-12"
      :value="filter.ValueFrom"
      :disable="!filter.Enable"
      :rules="moneyInputRules"
      @change="event => updateValueFrom(event.target.value)"
      outlined
      dense
      ref="inputFrom"
      :clearable="filter.ValueFrom !== filterCurrent.ValueFrom"
      @clear="resetFrom"
    />
    <q-space />
    <q-input
      class="col-12"
      :value="filter.ValueTo"
      :disable="!filter.Enable"
      :rules="moneyInputRules"
      @change="event => updateValueTo(event.target.value)"
      outlined
      dense
      ref="inputTo"
      :clearable="filter.ValueTo !== filterCurrent.ValueTo"
      @clear="resetTo"
    />
  </r-header-filter>
</template>

<script>
import rHeaderFilter from './rHeaderFilter'

const minMoney = -922337203685477,
  maxMoney = 922337203685477

export default {
  components: {
    rHeaderFilter
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
    filterCurrent: {
      type: Object,
      required: true
    },
    filterUpdate: {
      type: Function,
      required: true
    }
  },
  methods: {
    resetFrom () {
      this.filterUpdate(this.field.Tag, { ValueFrom: this.filterCurrent.ValueFrom })
      setTimeout(() => {
        this.$refs.inputFrom.resetValidation()
      })
    },
    updateValueFrom (eventValue) {
      this.filterUpdate(this.field.Tag, { ValueFrom: eventValue })
    },
    resetTo () {
      this.filterUpdate(this.field.Tag, { ValueTo: this.filterCurrent.ValueTo })
      setTimeout(() => {
        this.$refs.inputTo.resetValidation()
      })
    },
    updateValueTo (eventValue) {
      this.filterUpdate(this.field.Tag, { ValueTo: eventValue })
    }
  }
}
</script>
