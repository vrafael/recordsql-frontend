<template>
  <div>
    <q-banner class="bg-linear text-white">
      <span class="text-h6">Filters</span>
    </q-banner>
    <q-form class="q-pa-md">
      <r-filter-float />
      <r-filter-string />
      <r-filter-money />
      <r-filter-link />
      <r-filter-bigint />
      <r-filter-int />
      <r-filter-datetime />
      <r-filter-time />
      <r-filter-date />
      <r-filter-color />
      <r-filter-bool />
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
  }
}
</script>
