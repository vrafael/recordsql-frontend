<template>
  <r-field :field="field">
    <q-input
      ref="input"
      :value="value"
      @change="event => updateFieldDataOnChange(event.target.value)"
      :rules="floatInputRules"
      outlined
      dense
      :clearable="compareWithOriginValue()"
      @clear="() => reset()"
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
  data: () => ({
    floatInputRules: [
      val => (
        /(^-?\d*(.\d*)?$)?/
          .test(val)
      ) || 'Please use float number format'
    ]
  }),
  props: {
    field: {
      type: Object,
      required: true
    },
    value: {
      type: [Number, String],
      default: null
    },
    originValue: {
      type: [Number, String],
      default: null
    }
  },
  methods: {
    ...mapActions([
      'RECORD_STATE_UPDATE_FIELD'
    ]),
    reset () {
      this.$refs.input.resetValidation()
      const obj = { [`${this.field.Tag}`]: this.originValue }
      this.RECORD_STATE_UPDATE_FIELD(obj)
    },
    updateFieldDataOnChange (eventValue) {
      const obj = { [`${this.field.Tag}`]: eventValue }
      this.RECORD_STATE_UPDATE_FIELD(obj)
    },
    compareWithOriginValue () {
      return JSON.stringify(this.value) !== JSON.stringify(this.originValue)
    }
  }
}
</script>
