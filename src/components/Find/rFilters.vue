<template>
  <div>
    <q-banner class="bg-linear text-white">
      <span class="text-h6">Filters</span>
    </q-banner>
    <q-form class="q-pa-sm q-gutter-sm">
      <r-filter-bool />
      <r-filter-color />
      <r-filter-date />

      <!--div class="row">
        <q-btn
          color="primary"
          style="width: 140px"
        >
          <q-icon
            left
            name="check"
          />
          Apply
        </q-btn>
        <q-space />

        <q-btn
          color="primary"
          style="width: 140px"
        >
          <q-icon
            left
            name="close"
          />
          Clean
        </q-btn>
      </div-->
    </q-form>
  </div>
</template>

<script>
import rFilterBool from './Filters/rFilterBool'
import rFilterColor from './Filters/rFilterColor'
import rFilterDate from './Filters/rFilterDate'

export default {
  components: {
    rFilterBool,
    rFilterColor,
    rFilterDate
  }
}
</script>
