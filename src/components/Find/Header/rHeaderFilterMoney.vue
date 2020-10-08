<template>
  <r-header-filter
    :field="field"
    :filter-apply="filterApply"
  >
    <q-input
      class="r-header-filter-money-input col-12"
      :value="filter.ValueFrom"
      :rules="moneyInputRules"
      @input="event => updateValueFrom(event)"
      outlined
      dense
      ref="inputFrom"
      label="From"
      clearable
      @clear="updateValueFrom(null)"
    />
    <q-input
      class="r-header-filter-money-input col-12"
      :value="filter.ValueTo"
      :rules="moneyInputRules"
      @input="event => updateValueTo(event)"
      outlined
      dense
      ref="inputTo"
      label="To"
      clearable
      @clear="updateValueTo(null)"
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
          val => !val || /^(-?\d+(\.\d{1,4})?)?$/.test(val) || 'Please use money format',
          val => !val || (parseFloat(val) > minMoney && parseFloat(val) < maxMoney) ||
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
    filterUpdate: {
      type: Function,
      required: true
    },
    filterApply: {
      type: Function,
      required: true
    }
  },
  methods: {
    updateValueFrom (eventValue) {
      this.filterUpdate(this.field.Tag, { ValueFrom: eventValue })
    },
    updateValueTo (eventValue) {
      this.filterUpdate(this.field.Tag, { ValueTo: eventValue })
    }
  },
  watch: {
    filter: {
      handler: function (filter) {
        if (filter.ValueFrom || filter.ValueTo) {
          this.filterUpdate(this.field.Tag, { isChanged: true })
        } else {
          this.filterUpdate(this.field.Tag, { isChanged: false })
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
.r-header-filter-int-input {
  /* Chrome, Safari, Edge, Opera */
  & input::-webkit-outer-spin-button,
  & input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  & input[type="number"] {
    -moz-appearance: textfield;
  }
}
</style>
