<template>
  <r-filter
    :field="field"
    :filter="filter"
  >
    <q-input
      ref="input"
      class="col-9 q-field--with-bottom"
      :value="filter.Value"
      @change="event => updateValue(event.target.value)"
      :disable="!filter.Enable"
      outlined
      dense
      :clearable="filter.Value !== filterOrigin.Value"
      @clear="reset"
    />
  </r-filter>
</template>

<script>
import { mapActions } from 'vuex'
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
    filterOrigin: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions([
      'FILTER_STATE_UPDATE_FIELD'
    ]),
    reset () {
      setTimeout(() => {
        this.$refs.input.resetValidation()
      })
      const filter = { ...this.filter }
      filter.Value = this.filterOrigin.Value
      const obj = { [`${this.field.Tag}`]: filter }
      this.FILTER_STATE_UPDATE_FIELD(obj)
    },
    updateValue (eventValue) {
      const filter = { ...this.filter }
      filter.Value = eventValue
      const obj = { [`${this.field.Tag}`]: filter }
      this.FILTER_STATE_UPDATE_FIELD(obj)
    }
  }
}
</script>
