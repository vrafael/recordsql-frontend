<template>
  <r-header-filter
    :field="field"
  >
    <q-form
      @submit="applyFilter"
      class="full-width"
    >
      <q-input
        class="col-12"
        :value="filter.Value"
        @input="event => updateValue(event)"
        outlined
        dense
        ref="input"
        label="String"
        clearable
        @clear="updateValue(null)"
      />
      <div class="col-12 q-my-sm">
        <q-btn
          class="full-width"
          color="primary"
          size="md"
          type="submit"
        >
          OK
        </q-btn>
      </div>
    </q-form>
  </r-header-filter>
</template>

<script>
import rHeaderFilter from './rHeaderFilter'

export default {
  components: {
    rHeaderFilter
  },
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
    },
    applyFilter: {
      type: Function,
      required: true
    }
  },
  methods: {
    updateValue (eventValue) {
      this.filterUpdate(this.field.Tag, { Value: eventValue })
    }
  },
  watch: {
    filter: {
      handler: function (filter) {
        if (filter.Value) {
          this.filterUpdate(this.field.Tag, { isChanged: this.filter.isChanged = true })
        } else {
          this.filterUpdate(this.field.Tag, { isChanged: this.filter.isChanged = false })
        }
      },
      deep: true
    }
  }
}
</script>
