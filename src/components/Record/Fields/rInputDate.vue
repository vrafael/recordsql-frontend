<template>
  <r-field :field="field">
    <q-input
      ref="input"
      :value="value"
      @change="event => updateFieldOnChange(event.target.value)"
      :mask="dateInputMask"
      :rules="dateInputRules"
      outlined
      dense
      :clearable="value !== originValue"
      @clear="updateFieldOnChange(originValue)"
    >
      <template #append>
        <q-icon
          @click="applyValueToProxy"
          name="event"
          class="cursor-pointer"
        >
          <q-popup-proxy
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date
              v-model="proxyValue"
              :mask="dateMask"
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
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </r-field>
</template>

<script>
import rField from './rField'

export default {
  components: {
    rField
  },
  data: () => ({
    dateInputMask: '####-##-##',
    dateInputRules: [
      val => !val || /^(\d{4}-(0\d|1[0-2])-([0-2]\d|3[0-1]))?$/.test(val) || 'Please use format "YYYY-MM-DD"'
    ],
    dateMask: 'YYYY-MM-DD',
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
      const value = this.proxyValue
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
