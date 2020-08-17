<template>
  <r-field :field="field">
    <q-checkbox
      class="q-field--with-bottom"
      toggle-indeterminate
      indeterminate-value="null"
      :value="value"
      @input="event => updateFieldDataOnChange(event)"
      :label="label"
      dense
    />
  </r-field>
</template>

<script>
import { mapActions } from 'vuex'
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
      type: [
        Boolean,
        String
      ],
      default: null
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
    ...mapActions([
      'RECORD_STATE_UPDATE_FIELD'
    ]),
    updateFieldDataOnChange (eventValue) {
      const obj = { [`${this.field.Tag}`]: eventValue }
      this.RECORD_STATE_UPDATE_FIELD(obj)
    }
  }
}
</script>
