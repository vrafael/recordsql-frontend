<template>
  <r-field :field="field">
    <q-input
      ref="input"
      type="textarea"
      class="q-field--with-bottom"
      :value="value"
      @change="event => updateFieldDataOnChange(event.target.value)"
      dense
      outlined
      @clear="() => reset()"
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
    },
    reset () {
      const fieldTag = this.field.Tag.toString()
      setTimeout(() => {
        this.$refs.input.resetValidation()
      })
      const originValue = this.$store.getters.RECORD_ORIGIN_GET[fieldTag]
      this.$store.dispatch('RECORD_STATE_UPDATE_INIT', [originValue, this.field])
    }
  }
}
</script>
