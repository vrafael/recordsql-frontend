<template>
  <div class="col-9">
    <q-checkbox
      slot="prepend"
      class="q-field--with-bottom"
      toggle-indeterminate
      indeterminate-value="null"
      v-model="value"
      :label="value.toString().toUpperCase()"
      dense
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    value: false
  })
}
</script>
