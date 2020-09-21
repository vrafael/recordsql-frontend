<template>
  <r-field :field="field">
    <q-input
      ref="input"
      type="textarea"
      class="q-field--with-bottom"
      :value="value"
      @change="event => updateFieldOnChange(event.target.value)"
      dense
      outlined
      :clearable="value !== originValue"
      @clear="() => updateFieldOnChange(originValue)"
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
    },
    originValue: {
      type: String,
      default: null
    },
    change: {
      type: Function,
      required: true
    }
  },
  methods: {
    updateFieldOnChange (eventValue) {
      this.change({ [`${this.field.Tag}`]: eventValue })
    }
  }
}
</script>
