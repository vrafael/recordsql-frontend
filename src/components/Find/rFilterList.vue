<template>
  <div>
    <q-banner class="bg-linear text-white">
      <span class="text-h6">Filters</span>
    </q-banner>
    <q-form class="q-pa-md">
      <template v-if="!!fields">
        <component
          v-for="field in fields"
          :is="field.componentFilter.component"
          :field="field"
          :key="field.ID"
          :filter="filters[field.Tag]"
          :filter-current="filtersCurrent[field.Tag]"
          :filter-update="filterUpdate"
        />
      </template>
    </q-form>
  </div>
</template>

<script>
import rFilterBool from './Filters/rFilterBool'
import rFilterColor from './Filters/rFilterColor'
import rFilterDate from './Filters/rFilterDate'
import rFilterTime from './Filters/rFilterTime'
import rFilterDatetime from './Filters/rFilterDatetime'
import rFilterInt from './Filters/rFilterInt'
import rFilterBigint from './Filters/rFilterBigint'
import rFilterLink from './Filters/rFilterLink'
import rFilterMoney from './Filters/rFilterMoney'
import rFilterString from './Filters/rFilterString'
import rFilterFloat from './Filters/rFilterFloat'

export default {
  components: {
    // ToDo: 'my-component': () => import('./my-async-component')
    // https://ru.vuejs.org/v2/guide/components-dynamic-async.html#%D0%90%D1%81%D0%B8%D0%BD%D1%85%D1%80%D0%BE%D0%BD%D0%BD%D1%8B%D0%B5-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D1%8B
    rFilterBool,
    rFilterColor,
    rFilterDate,
    rFilterTime,
    rFilterDatetime,
    rFilterInt,
    rFilterBigint,
    rFilterLink,
    rFilterMoney,
    rFilterString,
    rFilterFloat
  },
  props: {
    fields: {
      type: Array,
      required: true
    },
    filters: {
      type: Object,
      required: true
    },
    filtersCurrent: {
      type: Object,
      required: true
    },
    filterUpdate: {
      type: Function,
      required: true
    }
  }
}
</script>
