<template>
  <div class="row q-my-md">
    <div
      class="col-3"
      @click="enable = !enable"
    >
      <q-toggle v-model="enable" />
      Bigint
    </div>
    <div class="col-4">
      <q-input
        type="number"
        v-model="valueFrom"
        :disable="!enable"
        :rules="bigintInputRules"
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
        :rules="bigintInputRules"
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
const maxBigint = Math.pow(2, 63) - 1,
  minBigint = -Math.pow(2, 63)

export default {
  data: () => ({
    bigintInputRules: [
      val => (val !== null && val !== '') || 'Please input integer number',
      val => (/^-?\d*$/.test(val)) || 'Please use number format',
      val => (val > minBigint && val < maxBigint) || 'Please use big integer value between -2^63 and 2^63-1'
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
