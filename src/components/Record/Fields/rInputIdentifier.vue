<template>
  <r-field :field="field">
    <q-input
      type="number"
      class="q-field--with-bottom"
      :value="value"
      @change="event => updateFieldDataOnChange(event.target.value)"
      outlined
      dense
      readonly
    />
  </r-field>
</template>

<script>
import rField from './rField'

export default {
  components: {
    rField
  },
  props: {
    field: {
      type: Object,
      required: true
    },
    value: {
      type: Number,
      default: null
    }
  },
  methods: {
    updateFieldDataOnChange (eventValue) {
      const field = this.field
      this.$store.dispatch('RECORD_STATE_UPDATE_INIT', [eventValue, field])
    }
  }
}
</script>
