<template>
  <q-input
    type="textarea"
    class="q-field--with-bottom"
    v-model="value"
    dense
    outlined
  />
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  }
}
</script>
