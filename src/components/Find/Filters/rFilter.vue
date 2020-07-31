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
import { mapActions } from 'vuex'

export default {
  props: {
    field: {
      type: Object,
      required: true
    },
    filter: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions(['FILTER_STATE_UPDATE_FIELD']),
    changeEnable: function () {
      const fieldTag = this.field.Tag
      const filter = { ...this.filter }
      filter.Enable = !filter.Enable
      const obj = { [`${fieldTag}`]: filter }
      this.FILTER_STATE_UPDATE_FIELD(obj)
    }
  }
}
</script>
