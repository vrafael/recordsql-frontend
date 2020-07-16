<template>
  <r-field :field="field">
    <q-input
      ref="input"
      :value="value"
      @change="updateFieldDataOnChange($event.target.value)"
      :mask="datetimeInputMask"
      :rules="datetimeInputRules"
      outlined
      dense
      clearable
      @clear="reset"
    >
      <template #append>
        <q-icon
          @click="applyValueToProxy"
          name="today"
          class="cursor-pointer"
        >
          <q-popup-proxy
            transition-show="scale"
            transition-hide="scale"
          >
            <div class="col">
              <div class="row no-wrap">
                <q-date
                  v-model="proxyValue"
                  :mask="datetimeMask"
                  class="no-shadow"
                />
                <q-time
                  v-model="proxyValue"
                  with-seconds
                  format24h
                  :mask="datetimeMask"
                  class="no-shadow"
                />
              </div>
              <div class="row justify-between q-pa-md">
                <q-btn
                  @click="applyProxyToValue"
                  label="OK"
                  color="primary"
                  flat
                  v-close-popup
                />
                <q-btn
                  label="Cancel"
                  color="primary"
                  flat
                  v-close-popup
                />
              </div>
            </div>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </r-field>
</template>

<script>
import rField from './rField'
import { date } from 'quasar'

export default {
  components: {
    rField
  },
  data: () => ({
    datetimeInputMask: '####-##-## ##:##:##.###',
    datetimeInputRules: [
      val => (/^[\d]{4}-(0\d|1[0-2])-([0-2]\d|3[0-1])\s([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d(\.[0-9]{1,3})?)?$/.test(val)) || 'Please use format "YYYY-MM-DD HH:mm:ss.nnn"'
    ],
    datetimeMask: 'YYYY-MM-DD HH:mm:ss',
    proxyValue: Date.now()
  }),
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
    applyProxyToValue () {
      const proxydatetime = date.extractDate(this.proxyValue, this.datetimeMask)
      this.value = date.formatDate(proxydatetime, 'YYYY-MM-DD HH:mm:ss.SSS')
    },
    applyValueToProxy () {
      this.proxyValue = this.value
    },
    reset () {
      setTimeout(() => {
        this.$refs.input.resetValidation()
      })
    },
    updateFieldDataOnChange (eventValue) {
      const field = this.field
      this.$store.dispatch('RECORD_STATE_UPDATE_INIT', [eventValue, field])
    }
  }
}
</script>
