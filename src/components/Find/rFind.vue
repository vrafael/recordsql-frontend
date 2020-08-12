<template>
  <q-splitter
    style="max-height: 85vh"
    v-model="splitter"
    horizontal
    unit="%"
    :limits="[0, 60]"
  >
    <q-inner-loading :showing="TYPE_METADATA_LOADING_STATE_GET">
      <q-spinner-gears
        size="50px"
        color="primary"
      />
    </q-inner-loading>

    <template #before>
      <r-filter-list />
    </template>
    <template #separator>
      <q-btn
        color="primary"
        padding="xs lg"
        size="xs"
        icon="drag_indicator"
        @click="filtersShow"
      />
    </template>
    <template #after>
      <q-table
        :data="find"
        :columns="TYPE_METADATA_COLUMNS_GET"
        :row-key="TYPE_METADATA_IDENTIFIER_GET"
        :loading="FIND_LOADING_STATE_GET"
        class="q-pa-sm my-sticky-dynamic"
        dense
        virtual-scroll
        :virtual-scroll-item-size="48"
        :virtual-scroll-sticky-size-start="48"
        :pagination="pagination"
        :rows-per-page-options="[0]"
        @virtual-scroll="onScroll"
      >
        <template #top>
          <q-btn color="primary">
            <q-icon
              left
              name="refresh"
            />
            Refresh
          </q-btn>
        </template>
        <template #body="props">
          <q-tr :props="props">
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              <template v-if="col.value && !!props.colsMap[col.name].component">
                <component
                  :is="props.colsMap[col.name].component"
                  :value="col.value"
                />
              </template>
              <div v-else>
                {{ col.value }}
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </template>
  </q-splitter>
</template>

<script>
import rFilterList from './rFilterList'
import rObject from '../rObject'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    rFilterList,
    rObject
  },
  props: {
    typeTag: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      splitter: 0,
      splitterRestore: 40,
      pagination: {
        rowsPerPage: 0
      }
    }
  },
  computed: {
    ...mapGetters(['TYPE_METADATA_LOADING_STATE_GET',
      'TYPE_METADATA_COLUMNS_GET',
      'TYPE_METADATA_IDENTIFIER_GET',
      'FIND_GET',
      'FIND_EOF_GET',
      'FIND_LOADING_STATE_GET',
      'FIND_LENGTH_GET']),
    find () {
      return Object.freeze(this.FIND_GET.slice())
    }
  },
  methods: {
    ...mapActions([
      'TYPE_METADATA_FETCH',
      'FIND_FETCH',
      'FIND_FETCH_NEXT',
      'TYPE_METADATA_FETCH_WITH_FILTER_INIT'
    ]),
    filtersShow () {
      if (this.splitter > 0) {
        this.splitterRestore = this.splitter
        this.splitter = 0
      } else if (this.splitterRestore > 0) {
        this.splitter = this.splitterRestore
        this.splitterRestore = 0
      } else {
        this.splitter = 25
      }
    },
    async refresh () {
      await this.TYPE_METADATA_FETCH_WITH_FILTER_INIT({ TypeTag: this.typeTag })
    },
    async dataFetch () {
      await this.FIND_FETCH_NEXT({ TypeTag: this.typeTag })
    },
    onScroll ({ to, ref }) {
      if (this.FIND_LOADING_STATE_GET !== true && !this.FIND_EOF_GET && to === this.FIND_LENGTH_GET - 1) {
        setTimeout(async () => {
          this.dataFetch()

          await this.$nextTick(() => {
            ref.refresh()
          })
        }, 0)
      }
    }
  },
  watch: {
    typeTag: async function () {
      await this.refresh()
    }
  },
  async mounted () {
    await this.refresh()
  }
}
</script>

<style lang="sass">
.my-sticky-dynamic
  height: 100%

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  thead tr:last-child th
    top: 48px
  thead tr:first-child th
    top: 0
</style>
