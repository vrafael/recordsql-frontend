<template>
  <r-header-filter
    :field="field"
  >
    <q-form
      @submit="applyFilter"
      class="full-width"
    >
      <q-checkbox
        :value="filter.Value"
        @input="event => updateValue(event)"
        :label="label"
        dense
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
  computed: {
    label: function () {
      return this.filter.Value === null
        ? ''
        : this.filter.Value.toString().toUpperCase()
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
        if (filter.Value === true) {
          this.filterUpdate(this.field.Tag, { isChanged: this.filter.isChanged = true })
        } else if (filter.Value === false) {
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
