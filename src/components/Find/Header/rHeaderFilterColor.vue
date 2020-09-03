<template>
  <r-header-filter
    :field="field"
    :filter="filter"
    :filter-update="filterUpdate"
  >
    <q-input
      ref="input"
      class="col-12"
      :value="filter.Value"
      @change="event => updateValue(event.target.value)"
      :rules="colorInputRules"
      :disable="!filter.Enable"
      mask="\#XXXXXXXX"
      outlined
      dense
      :clearable="filter.Value !== filterCurrent.Value"
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
  </r-header-filter>
</template>

<script>
import rHeaderFilter from './rHeaderFilter'
// ToDo import hexOrHexaColor from 'quasar/src/utils/patterns'

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
    filterCurrent: {
      type: Object,
      required: true
    },
    filterUpdate: {
      type: Function,
      required: true
    }
  },
  data: () => ({
    colorInputRules: [
      val => (!val) ||
        (val.length === 7) ||
        (val.length === 9) ||
        'Please use 6-8 characters',
      val => (!val) ||
        /^#([\da-fA-F]{6,8})$/.test(val) || 'Please use hex or hexa values (0-9 and A-F)'
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
    filter: {
      handler: function (filter) {
        if (filter.Value && (filter.Value.length === 7 || filter.Value.length === 9)) {
          this.helperColor.style.backgroundColor = filter.Value
        } else {
          this.helperColor.style.backgroundColor = null
        }
      },
      deep: true
    }
  },
  mounted () {
    this.helperColor.style.backgroundColor = this.filter.Value
  },
  methods: {
    reset () {
      this.filterUpdate(this.field.Tag, { Value: this.filterCurrent.Value })
      setTimeout(() => {
        this.$refs.input.resetValidation()
      })
    },
    applyProxyToValue () {
      this.updateValue(this.proxyValue)
    },
    applyValueToProxy () {
      this.proxyValue = this.filter.Value
    },
    updateValue (eventValue) {
      this.filterUpdate(this.field.Tag, { Value: eventValue })
    }
  }
}
</script>
