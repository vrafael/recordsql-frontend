<template>
  <div class="row">
    <div
      class="col-3"
      @click="enable = !enable"
    >
      <q-toggle v-model="enable" />
      Date
    </div>
    <div class="col-4">
      <q-input
        v-model="valueFrom"
        :mask="dateInputMask"
        :rules="dateInputRules"
        :disable="!enable"
        outlined
        dense
        ref="inputFrom"
        clearable
        @clear="resetFrom"
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
    </div>
    <q-space />
    <div class="col-4">
      <q-input
        v-model="valueTo"
        :mask="dateInputMask"
        :rules="dateInputRules"
        :disable="!enable"
        outlined
        dense
        ref="inputTo"
        clearable
        @clear="resetTo"
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
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    dateInputMask: '####.##.##',
    dateInputRules: [
      val => (/^-?[\d]+\.[0-1]\d\.[0-3]\d$/.test(val)) || 'Please use format "YYYY.MM.DD"'
    ],
    dateMask: 'YYYY.MM.DD',
    enable: false,
    valueFrom: '',
    proxyValueFrom: Date.now(),
    valueTo: '',
    proxyValueTo: Date.now()
  }),
  methods: {
    applyProxyFromToValueFrom () {
      this.valueFrom = this.proxyValueFrom
      if (this.valueTo && this.valueFrom > this.valueTo) {
        this.valueTo = this.valueFrom
      }
    },
    applyValueFromToProxyFrom () {
      this.proxyValueFrom = this.valueFrom
    },
    resetFrom () {
      setTimeout(() => {
        this.$refs.inputFrom.resetValidation()
      })
    },
    applyProxyToToValueTo () {
      this.valueTo = this.proxyValueTo
      if (this.valueFrom && this.valueTo < this.valueFrom) {
        this.valueFrom = this.valueTo
      }
    },
    applyValueToToProxyTo () {
      this.proxyValueTo = this.valueTo
    },
    resetTo () {
      setTimeout(() => {
        this.$refs.inputTo.resetValidation()
      })
    }
  }
}
</script>>
