<template>
  <r-field :field="field">
    <q-input
      ref="input"
      :value="value"
      @change="event => updateFieldDataOnChange(event.target.value)"
      :rules="floatInputRules"
      outlined
      dense
      :clearable="recordChanged"
      @clear="reset"
    />
  </r-field>
</template>

<script>
import { mapActions } from 'vuex'
import rField from './rField'
import { isEqual } from 'lodash'

export default {
  components: {
    rField
  },
  data: () => ({
    floatInputRules: [
      val => !val || /^(-?\d+(\.\d+)?)?$/.test(val) || 'Please use float number format'
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
  computed: {
    recordChanged () {
      return !isEqual(this.value, this.originValue)
    }
  },
  methods: {
    ...mapActions([
      'RECORD_STATE_UPDATE_FIELD'
    ]),
    reset () {
      const obj = { [`${this.field.Tag}`]: this.originValue }
      this.RECORD_STATE_UPDATE_FIELD(obj)
      setTimeout(() => {
        this.$refs.input.resetValidation()
      }, 0)
    },
    updateFieldDataOnChange (eventValue) {
      const obj = { [`${this.field.Tag}`]: eventValue }
      this.RECORD_STATE_UPDATE_FIELD(obj)
    }
  }
}
</script>
