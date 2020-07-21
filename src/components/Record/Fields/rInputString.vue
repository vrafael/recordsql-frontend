<template>
  <r-field :field="field">
    <q-input
      ref="input"
      class="q-field--with-bottom"
      :value="value"
      outlined
      dense
      :clearable="compareWithOriginValue()"
      @clear="() => reset()"
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
    },
    reset () {
      const fieldTag = this.field.Tag.toString()
      setTimeout(() => {
        this.$refs.input.resetValidation()
      })
      const originValue = this.$store.getters.RECORD_ORIGIN_GET[fieldTag]
      this.$store.dispatch('RECORD_STATE_UPDATE_INIT', [originValue, this.field])
    },
    compareWithOriginValue () {
      const fieldTag = this.field.Tag.toString()
      const localState = JSON.stringify(this.$store.getters.RECORD_GET[fieldTag])
      const originState = JSON.stringify(this.$store.getters.RECORD_ORIGIN_GET[fieldTag])
      return localState !== originState
    }
  }
}
</script>
