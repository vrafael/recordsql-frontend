<template>
  <q-input
    v-model="value"
    :mask="dateInputMask"
    :rules="dateInputRules"
    outlined
    dense
    ref="input"
    clearable
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
    value: '',
    proxyValue: Date.now()
  }),
  methods: {
    applyProxyToValue () {
      this.value = this.proxyValue
    },
    applyValueToProxy () {
      this.proxyValue = this.value
    },
    reset () {
      setTimeout(() => {
        this.$refs.input.resetValidation()
      })
    }
  }
}
</script>
