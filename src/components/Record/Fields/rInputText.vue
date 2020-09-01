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
  computed: {
    recordChanged () {
      return !isEqual(this.value, this.originValue)
    }
  },
  methods: {
    ...mapActions([
      'RECORD_STATE_UPDATE_FIELD'
    ]),
    updateFieldDataOnChange (eventValue) {
      const obj = { [`${this.field.Tag}`]: eventValue }
      this.RECORD_STATE_UPDATE_FIELD(obj)
    },
    reset () {
      const obj = { [`${this.field.Tag}`]: this.originValue }
      this.RECORD_STATE_UPDATE_FIELD(obj)
      /* setTimeout(() => {
        this.$refs.input.resetValidation()
      }, 0) */
    }
  }
}
</script>
