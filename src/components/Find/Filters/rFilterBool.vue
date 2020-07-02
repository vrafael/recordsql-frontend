<template>
  <div class="row items-center">
    <div
      class="col-3"
      @click="enable = !enable"
    >
      <q-toggle v-model="enable" />
      Boolean
    </div>
    <div class="col-9">
      <q-checkbox
        slot="prepend"
        toggle-indeterminate
        indeterminate-value="null"
        v-model="value"
        :disable="!enable"
        :label="value.toString().toUpperCase()"
        dense
      />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    enable: false,
    value: false
  })
}
</script>
