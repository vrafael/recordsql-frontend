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
import { mapActions, mapGetters } from 'vuex'
import rField from './rField'

export default {
  components: {
    rField
  },
  data: () => ({
    floatInputRules: [
      val => (val !== null && val !== '') || 'Please input float number',
      val => (/^-?\d*(.\d*)?$/.test(val)) || 'Please use float number format'
    ]
  }),
  props: {
    field: {
      type: Object,
      required: true
    },
    value: {
      type: Number,
      default: null
    }
  },
  computed: {
    ...mapGetters(['RECORD_GET', 'RECORD_ORIGIN_GET'])
  },
  methods: {
    ...mapActions(['RECORD_STATE_UPDATE_INIT']),
    reset () {
      const fieldTag = this.field.Tag.toString()
      setTimeout(() => {
        this.$refs.input.resetValidation()
      })
      const originValue = this.RECORD_ORIGIN_GET[fieldTag]
      this.RECORD_STATE_UPDATE_INIT([originValue, this.field])
    },
    updateFieldDataOnChange (eventValue) {
      this.RECORD_STATE_UPDATE_INIT([Number(eventValue), this.field])
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
