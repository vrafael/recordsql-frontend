<template>
  <r-field :field="field">
    <q-checkbox
      class="q-field--with-bottom"
      toggle-indeterminate
      indeterminate-value="null"
      :value="value"
      @input="event => updateFieldOnChange(event)"
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
      type: [Boolean, String],
      default: null
    },
    change: {
      type: Function,
      required: true
    }
  },
  computed: {
    label: function () {
      return this.value === null
        ? 'NULL'
        : this.value.toString().toUpperCase()
    }
  },
  methods: {
    updateFieldOnChange (eventValue) {
      this.change({ [`${this.field.Tag}`]: eventValue })
    }
  }
}
</script>
