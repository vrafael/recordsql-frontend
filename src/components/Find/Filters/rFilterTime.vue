<template>
  <r-filter
    :field="field"
    :filter="filter"
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
      :clearable="filter.ValueFrom !== filterOrigin.ValueFrom"
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
      :clearable="filter.ValueTo !== filterOrigin.ValueTo"
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
import { mapActions } from 'vuex'

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
    filterOrigin: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    timeInputMask: '##:##:##.###',
    timeInputRules: [
      val => /^(([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d(\.[0-9]{0,3})?)?)?$/.test(val) || 'Please use format "HH:mm:ss.nnn"'
    ],
    timeMask: 'HH:mm:ss',
    proxyValueFrom: Date.now(),
    proxyValueTo: Date.now()
  }),
  methods: {
    ...mapActions(['FILTER_STATE_UPDATE_FIELD']),
    resetFrom () {
      setTimeout(() => {
        this.$refs.inputFrom.resetValidation()
      })
      const filter = { ...this.filter }
      filter.ValueFrom = this.filterOrigin.ValueFrom
      const obj = { [`${this.field.Tag}`]: filter }
      this.FILTER_STATE_UPDATE_FIELD(obj)
    },
    updateValueFrom (eventValue) {
      const filter = { ...this.filter }
      // если в конце строки точка - добавляем нули
      const value = eventValue.toString().slice(-1) === '.' ? eventValue + '000' : eventValue
      filter.ValueFrom = value
      if (filter.ValueTo && filter.ValueFrom > filter.ValueTo) {
        filter.ValueTo = filter.ValueFrom
      }
      const obj = { [`${this.field.Tag}`]: filter }
      this.FILTER_STATE_UPDATE_FIELD(obj)
    },
    applyProxyFromToValueFrom () {
      this.updateValueFrom(this.proxyValueFrom)
    },
    applyValueFromToProxyFrom () {
      this.proxyValueFrom = this.filter.ValueFrom
    },
    resetTo () {
      setTimeout(() => {
        this.$refs.inputTo.resetValidation()
      })
      const filter = { ...this.filter }
      filter.ValueTo = this.filterOrigin.ValueTo
      const obj = { [`${this.field.Tag}`]: filter }
      this.FILTER_STATE_UPDATE_FIELD(obj)
    },
    updateValueTo (eventValue) {
      const filter = { ...this.filter }
      // если в конце строки точка - добавляем нули
      const value = eventValue.toString().slice(-1) === '.' ? eventValue + '000' : eventValue
      filter.ValueTo = value
      if (filter.ValueFrom && filter.ValueTo < filter.ValueFrom) {
        filter.ValueFrom = filter.ValueTo
      }
      const obj = { [`${this.field.Tag}`]: filter }
      this.FILTER_STATE_UPDATE_FIELD(obj)
    },
    applyProxyToToValueTo () {
      this.updateValueTo(this.proxyValueTo)
    },
    applyValueToToProxyTo () {
      this.proxyValueTo = this.filter.ValueTo
    }
  }
}
</script>
