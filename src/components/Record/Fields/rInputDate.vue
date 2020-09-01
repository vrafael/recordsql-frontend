<template>
  <r-field :field="field">
    <q-input
      ref="input"
      :value="value"
      @change="event => updateFieldDataOnChange(event.target.value)"
      :mask="dateInputMask"
      :rules="dateInputRules"
      outlined
      dense
      :clearable="recordChanged"
      @clear="reset"
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
import { mapActions } from 'vuex'
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
    }
  },
  computed: {
    recordChanged () {
      return JSON.stringify(this.value) !== JSON.stringify(this.originValue)
    }
  },
  methods: {
    ...mapActions([
      'RECORD_STATE_UPDATE_FIELD'
    ]),
    applyProxyToValue () {
      const value = this.proxyValue
      this.updateFieldDataOnChange(value)
    },
    applyValueToProxy () {
      this.proxyValue = this.value
    },
    reset () {
      const obj = { [`${this.field.Tag}`]: this.originValue }
      this.RECORD_STATE_UPDATE_FIELD(obj)
      setTimeout(() => {
        this.$refs.input.resetValidation()
      }, 0)
    },
    updateFieldDataOnChange (eventValue) {
      const obj = { [`${this.field.Tag}`]: eventValue }
      this.RECORD_STATE_UPDATE_FIELD(obj)
    }
  }
}
</script>
