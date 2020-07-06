<template>
  <r-filter
    label="Time"
    :enable.sync="enable"
  >
    <q-input
      class="col-4"
      v-model="valueFrom"
      :mask="timeInputMask"
      :rules="timeInputRules"
      :disable="!enable"
      outlined
      dense
      ref="inputFrom"
      clearable
      @clear="resetFrom"
    >
      <template #append>
        <q-icon
          @click="applyValueFromToProxyFrom"
          name="access_time"
          class="cursor-pointer"
        >
          <q-popup-proxy
            transition-show="scale"
            transition-hide="scale"
          >
            <q-time
              v-model="proxyValueFrom"
              with-seconds
              format24h
              :mask="timeMask"
            >
              <div class="row items-center justify-between">
                <q-btn
                  @click="applyProxyFromToValueFrom"
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

    <q-space />

    <q-input
      class="col-4"
      v-model="valueTo"
      :mask="timeInputMask"
      :rules="timeInputRules"
      :disable="!enable"
      outlined
      dense
      ref="inputTo"
      clearable
      @clear="resetTo"
    >
      <template #append>
        <q-icon
          @click="applyValueToToProxyTo"
          name="access_time"
          class="cursor-pointer"
        >
          <q-popup-proxy
            transition-show="scale"
            transition-hide="scale"
          >
            <q-time
              v-model="proxyValueTo"
              with-seconds
              format24h
              :mask="timeMask"
            >
              <div class="row items-center justify-between">
                <q-btn
                  @click="applyProxyToToValueTo"
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
  </r-filter>
</template>

<script>
import rFilter from './rFilter'
import { date } from 'quasar'

export default {
  components: {
    rFilter
  },
  data: () => ({
    timeInputMask: '##:##:##.###',
    timeInputRules: [
      val => (/^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d(\.[0-9]{1,3})?)?$/.test(val)) || 'Please use format "HH:mm:ss.nnn"'
    ],
    timeMask: 'HH:mm:ss',
    enable: false,
    valueFrom: '',
    proxyValueFrom: Date.now(),
    valueTo: '',
    proxyValueTo: Date.now()
  }),
  methods: {
    applyProxyFromToValueFrom () {
      const proxytime = date.extractDate(this.proxyValueFrom, this.timeMask)
      this.valueFrom = date.formatDate(proxytime, 'HH:mm:ss.SSS')

      if (this.valueTo && this.valueFrom > this.valueTo) {
        this.valueTo = this.valueFrom
      }
    },
    applyValueFromToProxyFrom () {
      this.proxyValueFrom = this.valueFrom
    },
    resetFrom () {
      setTimeout(() => {
        this.$refs.inputFrom.resetValidation()
      })
    },
    applyProxyToToValueTo () {
      const proxytime = date.extractDate(this.proxyValueTo, this.timeMask)
      this.valueTo = date.formatDate(proxytime, 'HH:mm:ss.SSS')

      if (this.valueFrom && this.valueTo < this.valueFrom) {
        this.valueFrom = this.valueTo
      }
    },
    applyValueToToProxyTo () {
      this.proxyValueTo = this.valueTo
    },
    resetTo () {
      setTimeout(() => {
        this.$refs.inputTo.resetValidation()
      })
    }
  }
}
</script>
