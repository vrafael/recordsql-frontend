<template>
  <div>
    <q-banner class="bg-linear text-white">
      <span class="text-h6">Filters</span>
    </q-banner>
    <q-form class="q-pa-md">
      <template v-if="!!TYPE_METADATA_FILTERS_GET">
        <component
          v-for="field in TYPE_METADATA_FILTERS_GET"
          :is="field.componentFilter.component"
          :field="field"
          :key="field.ID"
          :filter="FILTER_GET[field.Tag]"
          :filter-origin="FILTER_ORIGIN_GET[field.Tag]"
        />
      </template>

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
import rFilterTime from './Filters/rFilterTime'
import rFilterDatetime from './Filters/rFilterDatetime'
import rFilterInt from './Filters/rFilterInt'
import rFilterBigint from './Filters/rFilterBigint'
import rFilterLink from './Filters/rFilterLink'
import rFilterMoney from './Filters/rFilterMoney'
import rFilterString from './Filters/rFilterString'
import rFilterFloat from './Filters/rFilterFloat'
import { mapGetters } from 'vuex'

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
  },
  computed: {
    ...mapGetters(['TYPE_METADATA_FILTERS_GET', 'FILTER_GET', 'FILTER_ORIGIN_GET'])
  }
}
</script>
