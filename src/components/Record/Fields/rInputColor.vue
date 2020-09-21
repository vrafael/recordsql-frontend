<template>
  <r-field :field="field">
    <q-input
      ref="input"
      :value="value"
      @change="event => updateFieldOnChange(event.target.value)"
      :rules="colorInputRules"
      mask="XXXXXXXX"
      outlined
      dense
      :clearable="value !== originValue"
      @clear="updateFieldOnChange(originValue)"
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
import rField from './rField'

export default {
  components: {
    rField
  },
  data: () => ({
    colorInputRules: [
      val => !val || /^(([\da-fA-F]{6})|([\da-fA-F]{8}))$/.test(val) || 'Please use hex (6) or hexa (8) values (0-9 and A-F)'
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
      if (val && (val.length === 6 || val.length === 8)) {
        this.$data.helperColor.style.backgroundColor = `#${val}`
      } else {
        this.$data.helperColor.style.backgroundColor = null
      }
    }
  },
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
  mounted () {
    this.$data.helperColor.style.backgroundColor = `#${this.value}`
  },
  methods: {
    applyProxyToValue () {
      this.updateFieldOnChange(this.proxyValue.replace('#', '').toUpperCase())
    },
    applyValueToProxy () {
      this.proxyValue = this.value ? `#${this.value}` : null
    },
    updateFieldOnChange (eventValue) {
      this.change({ [`${this.field.Tag}`]: eventValue })
    }
  }
}
</script>
