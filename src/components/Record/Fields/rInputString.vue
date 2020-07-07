<template>
  <r-field label="String">
    <q-input
      class="q-field--with-bottom"
      v-model="value"
      outlined
      dense
      clearable
    />
  </r-field>
</template>

<script>
import rField from './rField'

export default {
  components: {
    rField
  },
  data () {
    return {
      value: null
    }
  }
}
</script>
