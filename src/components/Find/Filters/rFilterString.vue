<template>
  <div class="row q-my-md q-pb-md">
    <div
      class="col-3"
      @click="enable = !enable"
    >
      <q-toggle v-model="enable" />
      String
    </div>
    <div class="col-9">
      <q-input
        v-model="value"
        :disable="!enable"
        outlined
        dense
        ref="input"
        clearable
      />
    </div>
  </div>
</template>

<script>
// ToDo import hexOrHexaColor from 'quasar/src/utils/patterns'

export default {
  data: () => ({
    enable: false,
    value: null
  })
}
</script>
