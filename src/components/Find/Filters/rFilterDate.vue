<template>
  <r-filter
    :field="field"
    :filter="filter"
  >
    <q-input
      class="col-4"
      :mask="dateInputMask"
      :rules="dateInputRules"
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
          name="event"
          class="cursor-pointer"
        >
          <q-popup-proxy
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date
              v-model="proxyValueFrom"
              :mask="dateMask"
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
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-space />
    <q-input
      class="col-4"
      :mask="dateInputMask"
      :rules="dateInputRules"
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
          name="event"
          class="cursor-pointer"
        >
          <q-popup-proxy
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date
              v-model="proxyValueTo"
              :mask="dateMask"
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
            </q-date>
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
    dateInputMask: '####-##-##',
    dateInputRules: [
      val => (
        !val
      ) || /^\d{4}-(0\d|1[0-2])-([0-2]\d|3[0-1])$/
        .test(val) || 'Please use format "YYYY-MM-DD"'
    ],
    dateMask: 'YYYY-MM-DD',
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
      const proxytime = date.extractDate(this.proxyValueFrom, this.dateMask)
      const value = date.formatDate(proxytime, 'YYYY-MM-DD')
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
      const proxytime = date.extractDate(this.proxyValueTo, this.dateMask)
      const value = date.formatDate(proxytime, 'YYYY-MM-DD')
      this.updateValueTo(value)
    },
    applyValueToToProxyTo () {
      this.proxyValueTo = this.filter.ValueTo
    }
  }
}
</script>>
