<template>
  <div
    class="row"
    style="max-width: 300px"
  >
    <div class="col-12">
      <div
        class="row items-center no-wrap q-my-sm"
      >
        <q-icon
          :name="field.Type.Icon"
          color="accent"
          size="20px"
          class="q-mr-sm"
        />
        <span class="ellipsis">
          {{ field.Name }}
        </span>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    field: {
      type: Object,
      required: true
    },
    filter: {
      type: Object,
      required: true
    },
    filterUpdate: {
      type: Function,
      required: true
    }
  }
}
</script>
