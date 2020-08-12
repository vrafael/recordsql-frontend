<template>
  <r-filter
    :field="field"
    :filter="filter"
    :filter-update="filterUpdate"
  >
    <q-input
      ref="input"
      class="col-9 q-field--with-bottom"
      :value="filter.Value"
      @change="event => updateValue(event.target.value)"
      :disable="!filter.Enable"
      outlined
      dense
      :clearable="filter.Value !== filterCurrent.Value"
      @clear="reset"
    />
  </r-filter>
</template>

<script>
import rFilter from './rFilter'

export default {
  components: {
    rFilter
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
