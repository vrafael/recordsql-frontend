<template>
  <q-input
    class="q-field--with-bottom"
    v-model="value"
    outlined
    dense
    clearable
  />
</template>

<script>
export default {
  data () {
    return {
      value: null
    }
  }
}
</script>
