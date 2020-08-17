<template>
  <r-field :field="field">
    <q-input
      ref="input"
      :value="value"
      @change="event => updateFieldDataOnChange(event.target.value)"
      :rules="colorInputRules"
      mask="\#XXXXXXXX"
      outlined
      dense
      :clearable="compareWithOriginValue()"
      @clear="() => reset()"
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
    colorInputRules: [
      val => (
        !val
      ) || (
        val.length === 7
      ) || (
        val.length === 9
      ) || 'Please use 6-8 characters',
      val => (
        !val
      ) || (
        /^#([\da-fA-F]{6,8})$/
          .test(val)
      ) || 'Please use hex or hexa values (0-9 and A-F)'
    ],
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
      if (val && ((
        val.length === 4
      ) || (
        val.length === 7
      ) || (
        val.length === 9
      )
      )
      ) {
        this.$data.helperColor.style.backgroundColor = val
      }
    }
  },
  props: {
    field: {
      type: Object,
      required: true
    },
    value: {
      type: [String, null],
      default: null
    },
    originValue: {
      type: [String, null],
      default: null
    }
  },
  mounted () {
    this.$data.helperColor.style.backgroundColor = this.value
  },
  methods: {
    ...mapActions([
      'RECORD_STATE_UPDATE_FIELD'
    ]),
    applyProxyToValue () {
      this.value = this.proxyValue
    },
    applyValueToProxy () {
      this.proxyValue = this.value
    },
    reset () {
      this.$refs.input.resetValidation()
      this.$data.helperColor.style.backgroundColor = `#${this.originValue}`
      const obj = { [`${this.field.Tag}`]: this.originValue }
      this.RECORD_STATE_UPDATE_FIELD(obj)
    },
    updateFieldDataOnChange (eventValue) {
      const obj = { [`${this.field.Tag}`]: eventValue }
      this.RECORD_STATE_UPDATE_FIELD(obj)
    },
    compareWithOriginValue () {
      return JSON.stringify(this.value) !== JSON.stringify(this.originValue)
    }
  }
}
</script>
