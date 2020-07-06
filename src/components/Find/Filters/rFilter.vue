<template>
  <div class="row">
    <div
      class="col-3"
      @click="$emit('update:enable', !enable)"
    >
      <q-toggle
        :value="enable"
        @change="$emit('update:enable', $event.target.value)"
      />
      {{ label }}
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    enable: {
      type: Boolean,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>
