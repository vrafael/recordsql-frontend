<template>
  <r-field label="Text">
    <q-input
      type="textarea"
      class="q-field--with-bottom"
      v-model="value"
      dense
      outlined
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
      value: ''
    }
  }
}
</script>
