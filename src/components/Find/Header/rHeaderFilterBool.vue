<template>
  <r-header-filter
    :field="field"
    :filter-apply="filterApply"
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
    filterUpdate: {
      type: Function,
      required: true
    },
    filterApply: {
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
    updateValue (eventValue) {
      this.filterUpdate(this.field.Tag, { Value: eventValue })
    }
  },
  watch: {
    filter: {
      handler: function (filter) {
        if (filter.Value === true || filter.Value === false) {
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
