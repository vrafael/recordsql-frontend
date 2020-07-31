<template>
  <r-filter
    :field="field"
    :filter="filter"
  >
    <q-input
      class="col-4"
      v-model="valueFrom"
      :mask="datetimeInputMask"
      :rules="datetimeInputRules"
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
                  v-model="proxyValueFrom"
                  :mask="datetimeMask"
                  class="no-shadow"
                />
                <q-time
                  v-model="proxyValueFrom"
                  with-seconds
                  format24h
                  :mask="datetimeMask"
                  class="no-shadow"
                />
              </div>
              <div class="row justify-between q-pa-md">
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
            </div>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-space />

    <q-input
      class="col-4"
      v-model="valueTo"
      :mask="datetimeInputMask"
      :rules="datetimeInputRules"
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
          name="today"
          class="cursor-pointer"
        >
          <q-popup-proxy
            transition-show="scale"
            transition-hide="scale"
          >
            <div class="col">
              <div class="row">
                <q-date
                  v-model="proxyValueTo"
                  :mask="datetimeMask"
                  class="no-shadow"
                />
                <q-time
                  v-model="proxyValueTo"
                  with-seconds
                  format24h
                  :mask="datetimeMask"
                  class="no-shadow"
                />
              </div>
              <div class="row justify-between q-pa-md">
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
            </div>
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
  props: {
    field: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    datetimeInputMask: '####.##.## ##:##:##.###',
    datetimeInputRules: [
      val => (/^-?[\d]+\.[0-1]\d\.[0-3]\d\s([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d(\.[0-9]{1,3})?)?$/.test(val)) || 'Please use format "YYYY.MM.DD HH:mm:ss.nnn"'
    ],
    datetimeMask: 'YYYY.MM.DD HH:mm:ss',
    enable: false,
    valueFrom: '',
    proxyValueFrom: Date.now(),
    valueTo: '',
    proxyValueTo: Date.now()
  }),
  methods: {
    applyProxyFromToValueFrom () {
      const proxydatetime = date.extractDate(this.proxyValueFrom, this.datetimeMask)
      this.valueFrom = date.formatDate(proxydatetime, 'YYYY.MM.DD HH:mm:ss.SSS')

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
      const proxydatetime = date.extractDate(this.proxyValueTo, this.datetimeMask)
      this.valueTo = date.formatDate(proxydatetime, 'YYYY.MM.DD HH:mm:ss.SSS')

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
