<template>
  <r-header-filter
    :field="field"
    :filter-apply="filterApply"
  >
    <q-input
      class="col-12"
      :value="filter.Value"
      @input="event => updateValue(event)"
      outlined
      dense
      ref="input"
      label="String"
      clearable
      @clear="updateValue(null)"
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
  methods: {
    updateValue (eventValue) {
      this.filterUpdate(this.field.Tag, { Value: eventValue })
    }
  },
  watch: {
    filter: {
      handler: function (filter) {
        if (filter.Value) {
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
