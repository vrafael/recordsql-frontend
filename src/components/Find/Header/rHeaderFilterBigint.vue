<template>
  <r-header-filter
    :field="field"
    :filter-apply="filterApply"
  >
    <q-input
      class="r-header-filter-bigint-input col-12"
      type="number"
      :value="filter.ValueFrom"
      :rules="bigintInputRules"
      @input="event => updateValueFrom(event)"
      outlined
      dense
      ref="inputFrom"
      label="From"
      clearable
      @clear="updateValueFrom(null)"
    />
    <q-input
      class="r-header-filter-bigint-input col-12"
      type="number"
      :value="filter.ValueTo"
      :rules="bigintInputRules"
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

const maxBigint = Math.pow(2, 63) - 1,
  minBigint = -Math.pow(2, 63)

export default {
  components: {
    rHeaderFilter
  },
  data: () => ({
    bigintInputRules: [
      val => !val || /^(-?\d+)?$/.test(val) || 'Please use number format',
      val => (val >= minBigint && val <= maxBigint) || `Please use integer value between ${minBigint} and ${maxBigint}`
    ]
  }),
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
          this.filterUpdate(this.field.Tag, { isEnabled: true })
        } else {
          this.filterUpdate(this.field.Tag, { isEnabled: false })
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
.r-header-filter-bigint-input {
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
