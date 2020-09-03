<template>
  <r-header-filter
    :field="field"
    :filter="filter"
    :filter-update="filterUpdate"
  >
    <q-input
      ref="input"
      class="col-12"
      :value="filter.Value"
      @change="event => updateValue(event.target.value)"
      :disable="!filter.Enable"
      outlined
      dense
      :clearable="filter.Value !== filterCurrent.Value"
      @clear="reset"
    />
  </r-header-filter>
</template>

<script>
import rHeaderFilter from './rHeaderFilter'

export default {
  components: {
    rHeaderFilter
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
    reset () {
      this.filterUpdate(this.field.Tag, { Value: this.filterCurrent.Value })
      setTimeout(() => {
        this.$refs.input.resetValidation()
      })
    },
    updateValue (eventValue) {
      this.filterUpdate(this.field.Tag, { Value: eventValue })
    }
  }
}
</script>
