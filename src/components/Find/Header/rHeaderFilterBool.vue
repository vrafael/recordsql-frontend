<template>
  <r-header-filter
    :field="field"
    :filter="filter"
    :filter-update="filterUpdate"
  >
    <q-checkbox
      :value="filter.Value"
      @input="event => updateValue(event)"
      :label="label"
      dense
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
    /* filterCurrent: {
      type: Object,
      required: true
    }, */
    filterUpdate: {
      type: Function,
      required: true
    }
  },
  computed: {
    label: function () {
      return this.filter.Value === null
        ? ''
        : this.filter.Value.toString().toUpperCase()
    }
  },
  methods: {
    /* reset () {
      this.filterUpdate(this.field.Tag, { Value: this.filterCurrent.Value })
      setTimeout(() => {
        this.$refs.input.resetValidation()
      })
    }, */
    updateValue (eventValue) {
      this.filterUpdate(this.field.Tag, { Value: eventValue })
    }
  }
}
</script>
