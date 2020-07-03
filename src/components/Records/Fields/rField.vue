<template>
  <div class="row">
    <div class="col-3">
      {{ label }}
    </div>
    <div class="col-9">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>
