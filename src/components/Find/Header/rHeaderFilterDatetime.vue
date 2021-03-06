<template>
  <r-header-filter
    :field="field"
    :filter-apply="filterApply"
  >
    <q-input
      class="col-12"
      :mask="datetimeInputMask"
      :rules="datetimeInputRules"
      :value="filter.ValueFrom"
      @input="event => updateValueFrom(event)"
      outlined
      label="From"
      dense
      ref="inputFrom"
      clearable
      @clear="updateValueFrom(null)"
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
      class="col-12"
      :mask="datetimeInputMask"
      :rules="datetimeInputRules"
      :value="filter.ValueTo"
      @input="event => updateValueTo(event)"
      outlined
      dense
      ref="inputTo"
      label="To"
      clearable
      @clear="updateValueTo(null)"
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
  </r-header-filter>
</template>

<script>
import rHeaderFilter from './rHeaderFilter'
import { date } from 'quasar'

export default {
  components: {
    rHeaderFilter
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
    filterUpdate: {
      type: Function,
      required: true
    },
    filterApply: {
      type: Function,
      required: true
    }
  },
  data: () => ({
    datetimeInputMask: '####-##-## ##:##:##.###',
    datetimeInputRules: [
      val => !val || /^(\d{4}-(0\d|1[0-2])-([0-2]\d|3[0-1])[ T]([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d(\.[0-9]{1,7})?)?)?$/
        .test(val) ||
        'Please use format "YYYY-MM-DD HH:mm:ss.nnn"'
    ],
    datetimeMask: 'YYYY-MM-DD HH:mm:ss',
    proxyValueFrom: Date.now(),
    proxyValueTo: Date.now()
  }),
  methods: {
    updateValueFrom (eventValue) {
      this.filterUpdate(this.field.Tag, { ValueFrom: eventValue })
    },
    applyProxyFromToValueFrom () {
      const proxytime = date.extractDate(this.proxyValueFrom, this.datetimeMask)
      const value = date.formatDate(proxytime, 'YYYY-MM-DD HH:mm:ss.SSS')
      this.updateValueFrom(value)
    },
    applyValueFromToProxyFrom () {
      this.proxyValueFrom = this.filter.ValueFrom
    },
    updateValueTo (eventValue) {
      this.filterUpdate(this.field.Tag, { ValueTo: eventValue })
    },
    applyProxyToToValueTo () {
      const proxytime = date.extractDate(this.proxyValueTo, this.datetimeMask)
      const value = date.formatDate(proxytime, 'YYYY-MM-DD HH:mm:ss.SSS')
      this.updateValueTo(value)
    },
    applyValueToToProxyTo () {
      this.proxyValueTo = this.filter.ValueTo
    }
  },
  watch: {
    filter: {
      handler: function (filter) {
        if (filter.ValueFrom || filter.ValueTo) {
          this.filterUpdate(this.field.Tag, { isEnabled: true })
        } else {
          this.filterUpdate(this.field.Tag, { isEnabled: false })
        }
      },
      deep: true
    }
  }
}
</script>
