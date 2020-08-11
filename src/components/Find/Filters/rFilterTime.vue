<template>
  <r-filter
    :field="field"
    :filter="filter"
    :filterUpdate="filterUpdate"
  >
    <q-input
      class="col-4"
      :mask="timeInputMask"
      :rules="timeInputRules"
      :value="filter.ValueFrom"
      :disable="!filter.Enable"
      @change="event => updateValueFrom(event.target.value)"
      outlined
      dense
      ref="inputFrom"
      :clearable="filter.ValueFrom !== filterCurrent.ValueFrom"
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
      :mask="timeInputMask"
      :rules="timeInputRules"
      :value="filter.ValueTo"
      :disable="!filter.Enable"
      @change="event => updateValueTo(event.target.value)"
      outlined
      dense
      ref="inputTo"
      :clearable="filter.ValueTo !== filterCurrent.ValueTo"
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
  props: {
    field: {
      type: Object,
      required: true
    },
    filter: {
      type: Object,
      required: true
    },
    filterCurrent: {
      type: Object,
      required: true
    },
    filterUpdate: {
      type: Function,
      required: true
    }
  },
  data: () => ({
    timeInputMask: '##:##:##.###',
    timeInputRules: [
      val => !val || /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d(\.[0-9]{0,3})?)?$/.test(val) || 'Please use format "HH:mm:ss.nnn"'
    ],
    timeMask: 'HH:mm:ss',
    proxyValueFrom: Date.now(),
    proxyValueTo: Date.now()
  }),
  methods: {
    resetFrom () {
      this.filterUpdate(this.field.Tag, { ValueFrom: this.filterCurrent.ValueFrom })
      setTimeout(() => {
        this.$refs.inputFrom.resetValidation()
      })
    },
    updateValueFrom (eventValue) {
      this.filterUpdate(this.field.Tag, { ValueFrom: eventValue })
    },
    applyProxyFromToValueFrom () {
      const proxytime = date.extractDate(this.proxyValueFrom, this.timeMask)
      const value = date.formatDate(proxytime, 'HH:mm:ss.SSS')
      this.updateValueFrom(value)
    },
    applyValueFromToProxyFrom () {
      this.proxyValueFrom = this.filter.ValueFrom
    },
    resetTo () {
      this.filterUpdate(this.field.Tag, { ValueTo: this.filterCurrent.ValueTo })
      setTimeout(() => {
        this.$refs.inputTo.resetValidation()
      })
    },
    updateValueTo (eventValue) {
      this.filterUpdate(this.field.Tag, { ValueTo: eventValue })
    },
    applyProxyToToValueTo () {
      const proxytime = date.extractDate(this.proxyValueTo, this.timeMask)
      const value = date.formatDate(proxytime, 'HH:mm:ss.SSS')
      this.updateValueTo(value)
    },
    applyValueToToProxyTo () {
      this.proxyValueTo = this.filter.ValueTo
    }
  }
}
</script>
