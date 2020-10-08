<template>
  <r-header-filter
    :field="field"
    :filter-apply="filterApply"
  >
    <q-input
      class="col-12"
      :mask="timeInputMask"
      :rules="timeInputRules"
      :value="filter.ValueFrom"
      @input="event => updateValueFrom(event)"
      outlined
      dense
      ref="inputFrom"
      label="From"
      clearable
      @clear="updateValueFrom(null)"
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
      class="col-12"
      :mask="timeInputMask"
      :rules="timeInputRules"
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
    timeInputMask: '##:##:##.###',
    timeInputRules: [
      val => !val || /^(([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d(\.[0-9]{1,7})?)?)?$/.test(val) ||
        'Please use format "HH:mm:ss.nnn"'
    ],
    timeMask: 'HH:mm:ss',
    proxyValueFrom: Date.now(),
    proxyValueTo: Date.now()
  }),
  methods: {
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
  },
  watch: {
    filter: {
      handler: function (filter) {
        if (filter.ValueFrom || filter.ValueTo) {
          this.filterUpdate(this.field.Tag, { isChanged: true })
        } else {
          this.filterUpdate(this.field.Tag, { isChanged: false })
        }
      },
      deep: true
    }
  }
}
</script>
