<template>
  <div class="row">
    <div class="col-3">
      <div
        class="row items-center no-wrap"
        @click="$emit('update:enable', !enable)"
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
        <q-space />
        <q-toggle
          :value="enable"
          @input="inputEnable"
        />
      </div>
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
    field: {
      type: Object,
      required: true
    }
  },
  methods: {
    inputEnable: function (value, evt) {
      this.$emit('update:enable', value) // $emit('update:enable', $event.target.value)
    }
  }
}
</script>
