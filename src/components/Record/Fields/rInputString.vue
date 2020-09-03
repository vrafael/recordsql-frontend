<template>
  <r-field :field="field">
    <q-input
      ref="input"
      class="q-field--with-bottom"
      :value="value"
      @change="event => updateFieldDataOnChange(event.target.value)"
      outlined
      dense
      :clearable="value !== originValue"
      @clear="() => updateFieldDataOnChange(originValue)"
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
      type: String,
      default: null
    },
    originValue: {
      type: String,
      default: null
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
