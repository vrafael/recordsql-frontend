<template>
  <r-header-filter
    :field="field"
    :filter="filter"
    :filter-update="filterUpdate"
  >
    <q-form
      @submit="$emit('apply-filter')"
      @reset="resetFieldInputs"
    >
      <q-input
        class="r-header-filter-bigint-input col-12"
        type="number"
        :value="filter.ValueFrom"
        :rules="bigintInputRules"
        @input="event => updateValueFrom(event)"
        outlined
        dense
        ref="inputFrom"
        label="From"
        :clearable="filter.ValueFrom !== filterCurrent.ValueFrom"
        @clear="resetFrom"
      />
      <q-input
        class="r-header-filter-bigint-input col-12"
        type="number"
        :value="filter.ValueTo"
        :rules="bigintInputRules"
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
          type="submit"
          :disable="isEmpty()"
        >
          Apply
        </q-btn>
        <q-btn
          color="primary"
          size="md"
          type="reset"
        >
          Clear
        </q-btn>
      </div>
    </q-form>
  </r-header-filter>
</template>

<script>
import rHeaderFilter from './rHeaderFilter'

const maxBigint = Math.pow(2, 63) - 1,
  minBigint = -Math.pow(2, 63)

export default {
  components: {
    rHeaderFilter
  },
  data: () => ({
    bigintInputRules: [
      val => (
        /(^-?\d*$)?/
          .test(val)
      ) || 'Please use number format',
      val => (
        val > minBigint && val < maxBigint
      ) || 'Please use big integer value between -2^63 and 2^63-1'
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
  .r-header-filter-bigint-input {
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
