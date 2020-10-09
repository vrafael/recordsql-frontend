<template>
  <r-header-filter
    :field="field"
    :filter-apply="filterApply"
  >
    <q-input
      class="r-header-filter-int-input col-12"
      type="number"
      :value="filter.ValueFrom"
      :rules="intInputRules"
      @input="event => updateValueFrom(event)"
      outlined
      dense
      ref="inputFrom"
      label="From"
      clearable
      @clear="updateValueFrom(null)"
    />
    <q-input
      class="r-header-filter-int-input col-12"
      type="number"
      :value="filter.ValueTo"
      :rules="intInputRules"
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

const maxInt = Math.pow(2, 31) - 1,
  minInt = -Math.pow(2, 31)

export default {
  components: {
    rHeaderFilter
  },
  data: () => ({
    intInputRules: [
      val => !val || /^(-?\d+)?$/.test(val) || 'Please use number format',
      val => (val >= minInt && val <= maxInt) || `Please use integer value between ${minInt} and ${maxInt}`
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
