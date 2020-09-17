<template>
  <r-header-filter
    :field="field"
    :filter="filter"
    :filter-update="filterUpdate"
  >
    <q-form
      @submit="$emit('apply-filter')"
      @reset="reset"
      class="full-width"
    >
      <q-checkbox
        :value="filter.Value"
        @input="event => updateValue(event)"
        :label="label"
        dense
      />
<!--      <div class="col-12 q-my-sm flex justify-between">-->
<!--        <q-btn-->
<!--          color="primary"-->
<!--          size="md"-->
<!--          type="submit"-->
<!--          :disable="isEmpty()"-->
<!--        >-->
<!--          Apply-->
<!--        </q-btn>-->
<!--        <q-btn-->
<!--          color="primary"-->
<!--          size="md"-->
<!--          type="reset"-->
<!--        >-->
<!--          Clear-->
<!--        </q-btn>-->
<!--      </div>-->
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
    filterCurrent: {
      type: Object,
      required: true
    },
    filterUpdate: {
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
    isEmpty () {
      return this.filter.Value === null
    },
    reset () {
      this.$emit('reset-field')
      this.filterUpdate(this.field.Tag, { Value: this.filterCurrent.Value })
    },
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
