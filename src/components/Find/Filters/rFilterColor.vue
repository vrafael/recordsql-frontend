<template>
  <r-filter
    :field="field"
    :enable.sync="enable"
  >
    <q-input
      class="col-9"
      v-model="value"
      :rules="colorInputRules"
      :disable="!enable"
      mask="\#XXXXXXXX"
      outlined
      dense
      ref="input"
      clearable
      @clear="reset"
    >
      <div
        slot="prepend"
        :style="helperColor.style"
        class="color-helper"
      />
      <q-icon
        @click="applyValueToProxy"
        slot="append"
        name="colorize"
        class="cursor-pointer"
      >
        <q-popup-proxy
          transition-show="scale"
          transition-hide="scale"
        >
          <q-card class="q-gutter-md">
            <q-color v-model="proxyValue" />
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
          </q-card>
        </q-popup-proxy>
      </q-icon>
    </q-input>
  </r-filter>
</template>

<script>
import rFilter from './rFilter'
// ToDo import hexOrHexaColor from 'quasar/src/utils/patterns'

export default {
  components: {
    rFilter
  },
  props: {
    field: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    colorInputRules: [
      val => (val && val.length >= 7 && val.length <= 9) || 'Please use 6-8 characters',
      val => /^#([\da-fA-F]{6,8})$/.test(val) || 'Please use hex or hexa values (0-9 and A-F)'
    ],
    enable: false,
    value: '',
    helperColor: {
      style: {
        backgroundColor: '',
        width: '20px',
        height: '20px'
      }
    },
    proxyValue: ''
  }),
  watch: {
    value: function (val) {
      if (val && (val.length === 4 || val.length === 7 || val.length === 9)) {
        this.helperColor.style.backgroundColor = val
      }
    }
  },
  mounted () {
    this.helperColor.style.backgroundColor = this.value
  },
  methods: {
    applyProxyToValue () {
      this.value = this.proxyValue
    },
    applyValueToProxy () {
      this.proxyValue = this.value
    },
    reset () {
      this.helperColor.style.backgroundColor = null
      setTimeout(() => {
        this.$refs.input.resetValidation()
      })
    }
  }
}
</script>
