<template>
  <r-field :field="field">
    <q-checkbox
      class="q-field--with-bottom"
      toggle-indeterminate
      indeterminate-value="null"
      :value="value"
      @change="updateFieldDataOnChange($event.target.value)"
      :label="label"
      dense
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
      type: Boolean,
      default: null
    }
  },
  computed: {
    label: function () {
      return this.value ? this.value.toString().toUpperCase() : 'NULL'
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
