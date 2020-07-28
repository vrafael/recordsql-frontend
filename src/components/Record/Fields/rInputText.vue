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
      :clearable="compareWithOriginValue()"
      @clear="() => reset()"
    />
  </r-field>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters(['RECORD_GET', 'RECORD_ORIGIN_GET'])
  },
  methods: {
    ...mapActions(['RECORD_STATE_UPDATE_INIT']),
    updateFieldDataOnChange (eventValue) {
      const obj = { [`${this.field.Tag}`]: eventValue }
      this.RECORD_STATE_UPDATE_INIT(obj)
    },
    reset () {
      const fieldTag = this.field.Tag.toString()
      setTimeout(() => {
        this.$refs.input.resetValidation()
      })
      const originValue = this.RECORD_ORIGIN_GET[fieldTag]
      const obj = { [`${this.field.Tag}`]: originValue }
      this.RECORD_STATE_UPDATE_INIT(obj)
    },
    compareWithOriginValue () {
      const fieldTag = this.field.Tag.toString()
      const localState = JSON.stringify(this.RECORD_GET[fieldTag])
      const originState = JSON.stringify(this.RECORD_ORIGIN_GET[fieldTag])
      return localState !== originState
    }
  }
}
</script>
