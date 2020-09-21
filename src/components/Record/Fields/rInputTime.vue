<template>
  <r-field :field="field">
    <q-input
      ref="input"
      :value="value"
      @change="event => updateFieldOnChange(event.target.value)"
      :mask="timeInputMask"
      :rules="timeInputRules"
      outlined
      dense
      :clearable="value !== originValue"
      @clear="() => updateFieldOnChange(originValue)"
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
      val => !val || /^(([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d(\.[0-9]{1,7})?)?)?$/.test(val) ||
        'Please use format "HH:mm:ss.nnn"'
    ],
    timeMask: 'HH:mm:ss',
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
    },
    originValue: {
      type: String,
      default: null
    },
    change: {
      type: Function,
      required: true
    }
  },
  methods: {
    applyProxyToValue () {
      const proxytime = date.extractDate(this.proxyValue, this.timeMask)
      const value = date.formatDate(proxytime, 'HH:mm:ss.SSS')
      this.updateFieldOnChange(value)
    },
    applyValueToProxy () {
      this.proxyValue = this.value
    },
    updateFieldOnChange (eventValue) {
      this.change({ [`${this.field.Tag}`]: eventValue })
    }
  }
}
</script>
