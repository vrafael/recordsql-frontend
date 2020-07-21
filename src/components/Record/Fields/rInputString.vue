<template>
  <r-field :field="field">
    <q-input
      class="q-field--with-bottom"
      :value="value"
      outlined
      dense
      clearable
      @change="event => updateFieldDataOnChange(event.target.value)"
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
      type: String,
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
