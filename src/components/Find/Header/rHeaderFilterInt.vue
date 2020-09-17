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
      <q-input
        class="r-header-filter-int-input col-12"
        type="number"
        :value="filter.ValueFrom"
        :rules="intInputRules"
        @input="event => updateValueFrom(event)"
        outlined
        dense
        ref="inputFrom"
        label="From"
        clearable
        @clear="updateValueFrom(null)"
      />
      <q-input
        class="r-header-filter-int-input col-12"
        type="number"
        :value="filter.ValueTo"
        :rules="intInputRules"
        @input="event => updateValueTo(event)"
        outlined
        dense
        ref="inputTo"
        label="To"
        clearable
        @clear="updateValueTo(null)"
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

const maxInt = Math.pow(2, 31) - 1,
  minInt = -Math.pow(2, 31)

export default {
  components: {
    rHeaderFilter
  },
  data: () => ({
    intInputRules: [
      val => !val || /^(-?\d+)?$/.test(val) || 'Please use number format',
      val => (val >= minInt && val <= maxInt) || `Please use integer value between ${minInt} and ${maxInt}`
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
    reset () {
      this.$emit('reset-field')
      this.filterUpdate(this.field.Tag, { ValueFrom: null })
      this.filterUpdate(this.field.Tag, { ValueTo: null })
      setTimeout(() => {
        this.$refs.inputTo.resetValidation()
        this.$refs.inputFrom.resetValidation()
      })
    },
    updateValueFrom (eventValue) {
      this.filterUpdate(this.field.Tag, { ValueFrom: eventValue })
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
  .r-header-filter-int-input {
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
