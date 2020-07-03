<template>
  <div class="row">
    <div
      class="col-3"
      @click="enable = !enable"
    >
      <q-toggle v-model="enable" />
      Float
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
export default {
  data: () => ({
    intInputRules: [
      val => (val !== null && val !== '') || 'Please input float number',
      val => (/^-?\d*(.\d*)?$/.test(val)) || 'Please use float number format'
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
