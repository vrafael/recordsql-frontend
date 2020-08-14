<template>
  <r-filter
    :field="field"
    :filter="filter"
  >
    <q-checkbox
      :value="filter.Value"
      :disable="!filter.Enable"
      @input="event => updateValue(event)"
      :label="label"
      dense
    />
  </r-filter>
</template>

<script>
import rFilter from './rFilter'
import { mapActions } from 'vuex'

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
    }
    /* filterOrigin: {
      type: Object,
      required: true
    } */
  },
  computed: {
    label: function () {
      return this.filter.Value === null
        ? ''
        : this.filter.Value.toString().toUpperCase()
    }
  },
  methods: {
    ...mapActions([
      'FILTER_STATE_UPDATE_FIELD'
    ]),
    /* reset () {
      setTimeout(() => {
        this.$refs.input.resetValidation()
      })
      const filter = { ...this.filter }
      filter.Value = this.filterOrigin.Value
      const obj = { [`${this.field.Tag}`]: filter }
      this.FILTER_STATE_UPDATE_FIELD(obj)
    }, */
    updateValue (eventValue) {
      const filter = { ...this.filter }
      filter.Value = eventValue
      const obj = { [`${this.field.Tag}`]: filter }
      this.FILTER_STATE_UPDATE_FIELD(obj)
    }
  }
}
</script>
