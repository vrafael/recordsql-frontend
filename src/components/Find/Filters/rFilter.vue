<template>
  <div class="row">
    <div class="col-3">
      <div
        class="row items-center no-wrap"
        @click="changeEnable"
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
          :value="filter.Enable"
          @input="changeEnable"
        />
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
  },
  methods: {
    changeEnable: function () {
      this.filterUpdate(this.field.Tag, { Enable: !this.filter.Enable })
    }
  }
}
</script>
