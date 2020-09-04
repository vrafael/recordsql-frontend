<template>
  <r-header-filter
    :field="field"
    :filter="filter"
    :filter-update="filterUpdate"
  >
    <q-input
      class="r-header-filter-bigint-input col-12"
      type="number"
      :value="filter.ValueFrom"
      :rules="bigintInputRules"
      @change="event => updateValueFrom(event.target.value)"
      outlined
      dense
      ref="inputFrom"
      label="From"
      :clearable="filter.ValueFrom !== filterCurrent.ValueFrom"
      @clear="resetFrom"
    />
    <q-input
      class="r-header-filter-bigint-input col-12"
      type="number"
      :value="filter.ValueTo"
      :rules="bigintInputRules"
      @change="event => updateValueTo(event.target.value)"
      outlined
      dense
      ref="inputTo"
      label="To"
      :clearable="filter.ValueTo !== filterCurrent.ValueTo"
      @clear="resetTo"
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
      val => (
        /(^-?\d*$)?/
          .test(val)
      ) || 'Please use number format',
      val => (
        val > minBigint && val < maxBigint
      ) || 'Please use big integer value between -2^63 and 2^63-1'
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

<style lang="scss">
  .r-header-filter-bigint-input {
    /* Chrome, Safari, Edge, Opera */
    & input::-webkit-outer-spin-button,
    & input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    & input[type=number] {
      -moz-appearance: textfield;
    }
  }
</style>
