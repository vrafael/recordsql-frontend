<template>
  <r-header-filter
    :field="field"
    :filter="filter"
    :filter-update="filterUpdate"
    style="max-width: 200px"
  >
    <q-input
      class="col-12"
      type="number"
      :value="filter.ValueFrom"
      :disable="!filter.Enable"
      :rules="intInputRules"
      @change="event => updateValueFrom(event.target.value)"
      dense
      outlined
      borderless
      ref="inputFrom"
      :clearable="filter.ValueFrom !== filterCurrent.ValueFrom"
      @clear="resetFrom"
    />
    <q-input
      class="col-12"
      type="number"
      :value="filter.ValueTo"
      :disable="!filter.Enable"
      :rules="intInputRules"
      @change="event => updateValueTo(event.target.value)"
      outlined
      dense
      borderless
      ref="inputTo"
      :clearable="filter.ValueTo !== filterCurrent.ValueTo"
      @clear="resetTo"
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
      val => (
        /(^-?\d*$)?/
          .test(val)
      ) || 'Please use number format',
      val => (
        val > minInt && val < maxInt
      ) || 'Please use integer value between -2^31 and 2^31-1'
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
