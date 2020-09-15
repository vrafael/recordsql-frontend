<template>
  <r-header-filter
    :field="field"
    :filter="filter"
    :filter-update="filterUpdate"
  >
    <q-form
      @submit="$emit('apply-filter')"
      @reset="reset"
    >
      <q-input
        class="col-12"
        :value="filter.Value"
        @input="event => updateValue(event)"
        :rules="colorInputRules"
        mask="XXXXXXXX"
        outlined
        dense
        ref="input"
        label="HEX or RGBa"
        :clearable="filter.ValueTo !== filterCurrent.ValueTo"
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
      <div class="col-12 q-my-sm flex justify-between">
        <q-btn
          color="primary"
          size="md"
          type="submit"
          :disable="isEmpty()"
        >
          Apply
        </q-btn>
        <q-btn
          color="primary"
          size="md"
          type="reset"
        >
          Clear
        </q-btn>
      </div>
    </q-form>
  </r-header-filter>
</template>

<script>
import rHeaderFilter from './rHeaderFilter'

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
        (val.length === 6) ||
        (val.length === 8) ||
        'Please use 6-8 characters',
      val => (!val) ||
        /^([\da-fA-F]{6,8})$/.test(val) || 'Please use hex or hexa values (0-9 and A-F)'
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

        if (filter.Value) {
          this.filterUpdate(this.field.Tag, { isChanged: this.filter.isChanged = true })
        } else {
          this.filterUpdate(this.field.Tag, { isChanged: this.filter.isChanged = false })
        }
      },
      deep: true
    }
  },
  mounted () {
    this.helperColor.style.backgroundColor = this.filter.Value
  },
  methods: {
    isEmpty () {
      return this.filter.Value === null
    },
    reset () {
      this.$emit('reset-field')
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
