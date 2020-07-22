<template>
  <q-splitter
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
              align="left"
            >
              <r-object
                v-if="typeof(col.value) === 'object'"
                :key="col.ID"
                :object="col.value"
              />
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
    typeID: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      splitter: 40,
      splitterRestore: null,
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
    ...mapActions(['TYPE_METADATA_FETCH', 'FIND_FETCH', 'FIND_FETCH_NEXT']),
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
      await this.TYPE_METADATA_FETCH(this.typeID ? { TypeID: this.typeID } : { TypeID: 1 })
      await this.FIND_FETCH(this.typeID ? { TypeID: this.typeID } : { TypeID: 1 })
    },
    async dataFetch () {
      await this.FIND_FETCH_NEXT(this.typeID ? { TypeID: this.typeID } : { TypeID: 1 })
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
    typeID: async function () {
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
  height: 600px

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
