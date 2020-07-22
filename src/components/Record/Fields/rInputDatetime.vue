<template>
  <r-field :field="field">
    <q-input
      ref="input"
      :value="value"
      @change="event => updateFieldDataOnChange(event.target.value)"
      :mask="datetimeInputMask"
      :rules="datetimeInputRules"
      outlined
      dense
      :clearable="compareWithOriginValue()"
      @clear="() => reset()"
    >
      <template #append>
        <q-icon
          @click="applyValueToProxy"
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
                  v-model="proxyValue"
                  :mask="datetimeMask"
                  class="no-shadow"
                />
                <q-time
                  v-model="proxyValue"
                  with-seconds
                  format24h
                  :mask="datetimeMask"
                  class="no-shadow"
                />
              </div>
              <div class="row justify-between q-pa-md">
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
            </div>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </r-field>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import rField from './rField'
import { date } from 'quasar'

export default {
  components: {
    rField
  },
  data: () => ({
    datetimeInputMask: '####-##-## ##:##:##.###',
    datetimeInputRules: [
      val => (/^[\d]{4}-(0\d|1[0-2])-([0-2]\d|3[0-1])[\sT]([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d(\.[0-9]{1,7})?)?$/.test(val)) || 'Please use format "YYYY-MM-DD HH:mm:ss.nnn"'
    ],
    datetimeMask: 'YYYY-MM-DD HH:mm:ss',
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
    }
  },
  computed: {
    ...mapGetters(['RECORD_ORIGIN_GET', 'RECORD_GET'])
  },
  methods: {
    ...mapActions(['RECORD_STATE_UPDATE_INIT']),
    applyProxyToValue () {
      const proxydatetime = date.extractDate(this.proxyValue, this.datetimeMask)
      this.value = date.formatDate(proxydatetime, 'YYYY-MM-DD HH:mm:ss.SSS')
    },
    applyValueToProxy () {
      this.proxyValue = this.value
    },
    reset () {
      const fieldTag = this.field.Tag.toString()
      setTimeout(() => {
        this.$refs.input.resetValidation()
      })
      const originValue = this.RECORD_ORIGIN_GET[fieldTag]
      this.RECORD_STATE_UPDATE_INIT([originValue, this.field])
    },
    updateFieldDataOnChange (eventValue) {
      this.RECORD_STATE_UPDATE_INIT([eventValue, this.field])
    },
    compareWithOriginValue () {
      const fieldTag = this.field.Tag.toString()
      const localState = JSON.stringify(this.RECORD_GET[fieldTag])
      const originState = JSON.stringify(this.RECORD_ORIGIN_GET[fieldTag])
      return localState !== originState
    }
  }
}
</script>
