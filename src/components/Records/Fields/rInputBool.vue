<template>
  <r-field label="Boolean">
    <q-checkbox
      slot="prepend"
      class="q-field--with-bottom"
      toggle-indeterminate
      indeterminate-value="null"
      v-model="value"
      :label="value.toString().toUpperCase()"
      dense
    />
  </r-field>
</template>

<script>
import rField from './rField'

export default {
  components: {
    rField
  },
  data: () => ({
    value: false
  })
}
</script>
