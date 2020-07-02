<template>
  <div class="row">
    <div
      class="col-3"
      @click="enable = !enable"
    >
      <q-toggle v-model="enable" />
      Int
    </div>
    <div class="col-4">
      <q-input
        type="number"
        v-model="valueFrom"
        :disable="!enable"
        :rules="intInputRules"
        outlined
        dense
        ref="inputFrom"
        clearable
        @clear="resetFrom"
      />
    </div>
    <q-space />
    <div class="col-4">
      <q-input
        type="number"
        v-model="valueTo"
        :disable="!enable"
        :rules="intInputRules"
        outlined
        dense
        ref="inputTo"
        clearable
        @clear="resetTo"
      />
    </div>
  </div>
</template>

<script>
const maxInt = Math.pow(2, 31) - 1,
  minInt = -Math.pow(2, 31)

export default {
  data: () => ({
    intInputRules: [
      val => (val !== null && val !== '') || 'Please input integer number',
      val => (/^-?\d*$/.test(val)) || 'Please use number format',
      val => (val > minInt && val < maxInt) || 'Please use integer value between -2^31 and 2^31-1'
    ],
    enable: false,
    valueFrom: null,
    valueTo: null
  }),
  methods: {
    resetFrom () {
      setTimeout(() => {
        this.$refs.inputFrom.resetValidation()
      })
    },
    resetTo () {
      setTimeout(() => {
        this.$refs.inputTo.resetValidation()
      })
    }
  }
}
</script>
