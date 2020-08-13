<template>
  <r-filter
    :field="field"
    :filter="filter"
  >
    <q-input
      class="col-4"
      :mask="datetimeInputMask"
      :rules="datetimeInputRules"
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
      :mask="datetimeInputMask"
      :rules="datetimeInputRules"
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
import { mapActions } from 'vuex'
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
    filterOrigin: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    datetimeInputMask: '####-##-## ##:##:##.###',
    datetimeInputRules: [
      val => (
        !val
      ) || /^\d{4}-(0\d|1[0-2])-([0-2]\d|3[0-1])[\sT]([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d(\.[0-9]{1,7})?)?$/
        .test(val) || 'Please use format "YYYY.MM.DD HH:mm:ss.nnn"'
    ],
    datetimeMask: 'YYYY-MM-DD HH:mm:ss',
    proxyValueFrom: Date.now(),
    proxyValueTo: Date.now()
  }),
  methods: {
    ...mapActions([
      'FILTER_STATE_UPDATE_FIELD'
    ]),
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
      filter.ValueFrom = eventValue
      const obj = { [`${this.field.Tag}`]: filter }
      this.FILTER_STATE_UPDATE_FIELD(obj)
    },
    applyProxyFromToValueFrom () {
      const proxytime = date.extractDate(this.proxyValueFrom, this.datetimeMask)
      const value = date.formatDate(proxytime, 'YYYY-MM-DD HH:mm:ss.SSS')
      this.updateValueFrom(value)
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
      filter.ValueTo = eventValue
      const obj = { [`${this.field.Tag}`]: filter }
      this.FILTER_STATE_UPDATE_FIELD(obj)
    },
    applyProxyToToValueTo () {
      const proxytime = date.extractDate(this.proxyValueTo, this.datetimeMask)
      const value = date.formatDate(proxytime, 'YYYY-MM-DD HH:mm:ss.SSS')
      this.updateValueTo(value)
    },
    applyValueToToProxyTo () {
      this.proxyValueTo = this.filter.ValueTo
    }
  }
}
</script>
