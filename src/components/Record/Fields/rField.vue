<template>
  <div class="row">
    <div class="col-3">
      <div class="row items-center">
        <q-icon
          :name="field.Type.Icon"
          color="accent"
          size="20px"
          class="q-mr-sm"
        />
        {{ field.Name }}
      </div>
    </div>
    <div class="col-9">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    field: {
      type: Object,
      required: true
    }
  }
}
</script>
