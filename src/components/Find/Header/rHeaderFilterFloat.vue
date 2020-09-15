<template>
  <r-header-filter
    :field="field"
    :filter="filter"
    :filter-update="filterUpdate"
  >
    <q-input
      class="r-header-filter-float-input col-12"
      :value="filter.ValueFrom"
      :rules="floatInputRules"
      @input="event => updateValueFrom(event)"
      outlined
      dense
      ref="inputFrom"
      label="From"
      :clearable="filter.ValueFrom !== filterCurrent.ValueFrom"
      @clear="resetFrom"
    />
    <q-input
      class="r-header-filter-float-input col-12"
      :value="filter.ValueTo"
      :rules="floatInputRules"
      @input="event => updateValueTo(event)"
      outlined
      dense
      ref="inputTo"
      label="To"
      :clearable="filter.ValueTo !== filterCurrent.ValueTo"
      @clear="resetTo"
    />
    <div class="col-12 q-my-sm flex justify-between">
      <q-btn
        color="primary"
        size="md"
        @click="$emit('apply-filter')"
        :disable="isEmpty()"
      >
        Apply
      </q-btn>
      <q-btn
        color="primary"
        size="md"
        @click="resetFieldInputs"
      >
        Clear
      </q-btn>
    </div>
  </r-header-filter>
</template>

<script>
import rHeaderFilter from './rHeaderFilter'

export default {
  components: {
    rHeaderFilter
  },
  data: () => ({
    floatInputRules: [
      val => (
        /^(-?\d+(\.\d+)?)?$/
          .test(val)
      ) || 'Please use float number format'
    ]
  }),
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
  methods: {
    isEmpty () {
      return (this.filter.ValueFrom || this.filter.ValueTo) === null
    },
    resetFieldInputs () {
      this.$emit('reset-field')
      this.resetFrom()
      this.resetTo()
    },
    resetFrom () {
      this.filterUpdate(this.field.Tag, { ValueFrom: this.filterCurrent.ValueFrom })
      setTimeout(() => {
        this.$refs.inputFrom.resetValidation()
      })
    },
    updateValueFrom (eventValue) {
      this.filterUpdate(this.field.Tag, { ValueFrom: eventValue })
    },
    resetTo () {
      this.filterUpdate(this.field.Tag, { ValueTo: this.filterCurrent.ValueTo })
      setTimeout(() => {
        this.$refs.inputTo.resetValidation()
      })
    },
    updateValueTo (eventValue) {
      this.filterUpdate(this.field.Tag, { ValueTo: eventValue })
    }
  },
  watch: {
    filter: {
      handler: function (filter) {
        if (filter.ValueFrom || filter.ValueTo) {
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

<style lang="scss">
  .r-header-filter-float-input {
    /* Chrome, Safari, Edge, Opera */
    & input::-webkit-outer-spin-button,
    & input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    & input[type=number] {
      -moz-appearance: textfield;
    }
  }
</style>
