<template>
  <r-filter
    :field="field"
    :filter="filter"
  >
    <q-input
      ref="input"
      class="col-9"
      :value="filter.Value"
      @change="event => updateValue(event.target.value)"
      :rules="colorInputRules"
      :disable="!filter.Enable"
      mask="\#XXXXXXXX"
      outlined
      dense
      :clearable="filter.Value !== filterOrigin.Value"
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
import { mapActions } from 'vuex'
// ToDo import hexOrHexaColor from 'quasar/src/utils/patterns'

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
    colorInputRules: [
      val => (val && val.length >= 7 && val.length <= 9) || 'Please use 6-8 characters',
      val => /^#([\da-fA-F]{6,8})$/.test(val) || 'Please use hex or hexa values (0-9 and A-F)'
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
    filter: function (filter) {
      if (filter.Value && (filter.Value.length === 4 || filter.Value.length === 7 || filter.Value.length === 9)) {
        this.helperColor.style.backgroundColor = filter.Value
      } else {
        this.helperColor.style.backgroundColor = null
      }
    }
  },
  mounted () {
    this.helperColor.style.backgroundColor = this.filter.Value
  },
  methods: {
    ...mapActions(['FILTER_STATE_UPDATE_FIELD']),
    reset () {
      setTimeout(() => {
        this.$refs.input.resetValidation()
      })
      const filter = { ...this.filter }
      filter.Value = this.filterOrigin.Value
      this.helperColor.style.backgroundColor = `#${filter.Value}`
      const obj = { [`${this.field.Tag}`]: filter }
      this.FILTER_STATE_UPDATE_FIELD(obj)
    },
    applyProxyToValue () {
      this.updateValue(this.proxyValue)
    },
    applyValueToProxy () {
      this.proxyValue = this.filter.Value
    },
    updateValue (eventValue) {
      const filter = { ...this.filter }
      filter.Value = eventValue
      const obj = { [`${this.field.Tag}`]: filter }
      this.FILTER_STATE_UPDATE_FIELD(obj)
    }
  }
}
</script>
