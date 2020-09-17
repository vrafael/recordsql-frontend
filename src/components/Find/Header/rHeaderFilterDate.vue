<template>
  <r-header-filter
    :field="field"
    :filter="filter"
    :filter-update="filterUpdate"
  >
    <q-form
      @submit="$emit('apply-filter')"
      @reset="reset"
      class="full-width"
    >
      <q-input
        class="col-12"
        :mask="dateInputMask"
        :rules="dateInputRules"
        :value="filter.ValueFrom"
        @input="event => updateValueFrom(event)"
        outlined
        dense
        ref="inputFrom"
        label="From"
        clearable
        @clear="updateValueFrom(null)"
      >
        <template #append>
          <q-icon
            @click="applyValueFromToProxyFrom"
            name="event"
            class="cursor-pointer"
          >
            <q-popup-proxy
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="proxyValueFrom"
                :mask="dateMask"
              >
                <div class="row items-center justify-between">
                  <q-btn
                    @click="applyProxyFromToValueFrom"
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
      <q-space />
      <q-input
        class="col-12"
        :mask="dateInputMask"
        :rules="dateInputRules"
        :value="filter.ValueTo"
        @input="event => updateValueTo(event)"
        outlined
        dense
        ref="inputTo"
        label="To"
        clearable
        @clear="updateValueTo(null)"
      >
        <template #append>
          <q-icon
            @click="applyValueToToProxyTo"
            name="event"
            class="cursor-pointer"
          >
            <q-popup-proxy
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="proxyValueTo"
                :mask="dateMask"
              >
                <div class="row items-center justify-between">
                  <q-btn
                    @click="applyProxyToToValueTo"
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
<!--      <div class="col-12 q-my-sm flex justify-between">-->
<!--        <q-btn-->
<!--          color="primary"-->
<!--          size="md"-->
<!--          type="submit"-->
<!--          :disable="isEmpty()"-->
<!--        >-->
<!--          Apply-->
<!--        </q-btn>-->
<!--        <q-btn-->
<!--          color="primary"-->
<!--          size="md"-->
<!--          type="reset"-->
<!--        >-->
<!--          Clear-->
<!--        </q-btn>-->
<!--      </div>-->
    </q-form>
  </r-header-filter>
</template>

<script>
import rHeaderFilter from './rHeaderFilter'
import { date } from 'quasar'

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
    dateInputMask: '####-##-##',
    dateInputRules: [
      val => !val || /^(\d{4}-(0\d|1[0-2])-([0-2]\d|3[0-1]))?$/.test(val) || 'Please use format "YYYY-MM-DD"'
    ],
    dateMask: 'YYYY-MM-DD',
    proxyValueFrom: Date.now(),
    proxyValueTo: Date.now()
  }),
  methods: {
    isEmpty () {
      return (this.filter.ValueFrom || this.filter.ValueTo) === null
    },
    reset () {
      this.$emit('reset-field')
      this.filterUpdate(this.field.Tag, { ValueFrom: null })
      this.filterUpdate(this.field.Tag, { ValueTo: null })
      setTimeout(() => {
        this.$refs.inputFrom.resetValidation()
        this.$refs.inputTo.resetValidation()
      })
    },
    updateValueFrom (eventValue) {
      this.filterUpdate(this.field.Tag, { ValueFrom: eventValue })
    },
    applyProxyFromToValueFrom () {
      const proxytime = date.extractDate(this.proxyValueFrom, this.dateMask)
      const value = date.formatDate(proxytime, 'YYYY-MM-DD')
      this.updateValueFrom(value)
    },
    applyValueFromToProxyFrom () {
      this.proxyValueFrom = this.filter.ValueFrom
    },
    updateValueTo (eventValue) {
      this.filterUpdate(this.field.Tag, { ValueTo: eventValue })
    },
    applyProxyToToValueTo () {
      const proxytime = date.extractDate(this.proxyValueTo, this.dateMask)
      const value = date.formatDate(proxytime, 'YYYY-MM-DD')
      this.updateValueTo(value)
    },
    applyValueToToProxyTo () {
      this.proxyValueTo = this.filter.ValueTo
    }
  },
  watch: {
    filter: {
      handler: function (filter) {
        if (filter.ValueFrom || filter.ValueTo) {
          this.filterUpdate(this.field.Tag, { isChanged: this.filter.isChanged = true })
        } else {
          this.filterUpdate(this.field.Tag, { isChanged: this.filter.isChanged = false })
        }
      },
      deep: true
    }
  }
}
</script>
