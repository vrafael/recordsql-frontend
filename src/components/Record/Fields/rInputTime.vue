<template>
  <r-field label="Time">
    <q-input
      ref="input"
      v-model="value"
      :mask="timeInputMask"
      :rules="timeInputRules"
      outlined
      dense
      clearable
      @clear="reset"
    >
      <template #append>
        <q-icon
          @click="applyValueToProxy"
          name="access_time"
          class="cursor-pointer"
        >
          <q-popup-proxy
            transition-show="scale"
            transition-hide="scale"
          >
            <q-time
              v-model="proxyValue"
              with-seconds
              format24h
              :mask="timeMask"
            >
              <div class="row items-center justify-between">
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
            </q-time>
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
    timeInputMask: '##:##:##.###',
    timeInputRules: [
      val => (/^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d(\.[0-9]{1,3})?)?$/.test(val)) || 'Please use format "HH:mm:ss.nnn"'
    ],
    timeMask: 'HH:mm:ss',
    enable: false,
    value: '',
    proxyValue: Date.now()
  }),
  methods: {
    applyProxyToValue () {
      const proxytime = date.extractDate(this.proxyValue, this.timeMask)
      this.value = date.formatDate(proxytime, 'HH:mm:ss.SSS')
    },
    applyValueToProxy () {
      this.proxyValue = this.value
    },
    reset () {
      setTimeout(() => {
        this.$refs.input.resetValidation()
      })
    }
  }
}
</script>
