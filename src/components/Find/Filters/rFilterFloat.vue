<template>
  <r-filter
    :field="field"
    :filter="filter"
  >
    <q-input
      class="col-4"
      type="number"
      :value="filter.ValueFrom"
      :disable="!filter.Enable"
      :rules="intInputRules"
      @change="event => updateValueFrom(event.target.value)"
      outlined
      dense
      ref="inputFrom"
      :clearable="filter.ValueFrom !== filterOrigin.ValueFrom"
      @clear="resetFrom"
    />
    <q-space />
    <q-input
      class="col-4"
      type="number"
      :value="filter.ValueTo"
      :disable="!filter.Enable"
      :rules="intInputRules"
      @change="event => updateValueTo(event.target.value)"
      outlined
      dense
      ref="inputTo"
      :clearable="filter.ValueTo !== filterOrigin.ValueTo"
      @clear="resetTo"
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
  data: () => ({
    intInputRules: [
      val => (val !== null && val !== '') || 'Please input float number',
      val => (/(^-?\d*(.\d*)?$)?/.test(val)) || 'Please use float number format'
    ]
  }),
  methods: {
    ...mapActions([
      'FILTER_STATE_UPDATE_FIELD'
    ]),
    resetFrom () {
      setTimeout(() => {
        this.$refs.inputFrom.resetValidation()
      })
      const filter = { ...this.filter }
      filter.ValueFrom = this.filterOrigin.ValueFrom
      const obj = { [`${this.field.Tag}`]: filter }
      this.FILTER_STATE_UPDATE_FIELD(obj)
    },
    updateValueFrom (eventValue) {
      const filter = { ...this.filter }
      filter.ValueFrom = Number(eventValue)
      if (filter.ValueTo && filter.ValueFrom > filter.ValueTo) {
        filter.ValueTo = filter.ValueFrom
      }
      const obj = { [`${this.field.Tag}`]: filter }
      this.FILTER_STATE_UPDATE_FIELD(obj)
    },
    resetTo () {
      setTimeout(() => {
        this.$refs.inputTo.resetValidation()
      })
      const filter = { ...this.filter }
      filter.ValueTo = this.filterOrigin.ValueTo
      const obj = { [`${this.field.Tag}`]: filter }
      this.FILTER_STATE_UPDATE_FIELD(obj)
    },
    updateValueTo (eventValue) {
      const filter = { ...this.filter }
      filter.ValueTo = Number(eventValue)
      if (filter.ValueFrom && filter.ValueTo < filter.ValueFrom) {
        filter.ValueFrom = filter.ValueTo
      }
      const obj = { [`${this.field.Tag}`]: filter }
      this.FILTER_STATE_UPDATE_FIELD(obj)
    }
  }
}
</script>
