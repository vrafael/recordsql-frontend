<template>
  <q-splitter
    style="max-height: 85vh"
    v-model="splitter.value"
    horizontal
    unit="%"
    :limits="[0, 60]"
    class="r-splitter"
  >
    <q-inner-loading :showing="type.loading">
      <q-spinner-gears
        size="50px"
        color="primary"
      />
    </q-inner-loading>

    <template
      #before
      v-if="!!type.metadata"
    >
      <r-filter-list
        :fields="typeMetadataFilters"
        :filters="findFilters"
        :filters-current="findFiltersCurrent"
        :filter-update="filterUpdate"
      />
    </template>
    <template #separator>
      <q-btn
        color="primary"
        padding="xs lg"
        size="xs"
        icon="drag_indicator"
        @click="splitterClick()"
      />
    </template>
    <template #after>
      <q-table
        :data="findRecordset()"
        :columns="typeMetadataColumns"
        :row-key="typeMetadataIdentifier"
        :loading="find.loading"
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
import fetchApiRPC from 'src/common/service.api.rpc'
import fieldsMapping from 'src/store/helpers/fieldsMapping'
import showNotify from 'src/common/service.notify'
import rColumnIdentifier from './Columns/rColumnIdentifier'

export default {
  components: {
    rFilterList,
    rObject,
    rColumnIdentifier
  },
  props: {
    typeTag: {
      type: String,
      required: true
    },
    filters: {
      type: Object,
      required: false,
      default: null
    }
    /* searchConfirm: {
      type: Function,
      required: false,
      default: null
    } */
  },
  data () {
    return {
      splitter: {
        value: 0,
        restore: 40
      },
      pagination: {
        rowsPerPage: 0
      },
      type: {
        metadata: null,
        loading: false
      },
      findFilters: this.filters,
      findFiltersCurrent: null,
      find: {
        recordset: [],
        loading: false,
        pageSize: 50,
        pageNumber: 1,
        isEOF: false // достигнут конец списка
      }
    }
  },
  computed: {
    typeMetadataColumns () {
      if (this.type.metadata && this.type.metadata.Fields) {
        const _columns = this.type.metadata.Fields.filter(field => field.componentColumn)
        if (_columns.length > 0) {
          return _columns.map(field => field.componentColumn)
        }
      }
      return []
    },
    typeMetadataIdentifier () {
      if (this.type.metadata && this.type.metadata.Fields) {
        const _field = this.type.metadata.Fields.find(field => field.Type.Tag === 'FieldIdentifier')
        if (_field) {
          return _field.Tag
        }
      }
      return null
    },
    typeMetadataFilters () {
      return this.type.metadata.Fields ? this.type.metadata.Fields.filter(field => field.componentFilter) : null
    }
  },
  methods: {
    splitterClick () {
      if (this.splitter.value > 0) {
        this.splitter.restore = this.splitter.value
        this.splitter.value = 0
      } else if (this.splitter.restore > 0) {
        this.splitter.value = this.splitter.restore
        this.splitter.restore = 0
      } else {
        this.splitter.value = 25
      }
    },
    findRecordset () {
      if (this.find.recordset) {
        return Object.freeze(this.find.recordset.slice())
      }
      return []
    },
    async filterUpdate (field, filter) {
      for (const property in filter) {
        this.findFilters[field][property] = filter[property]
      }
    },
    async typeMetadataFetch () {
      this.type.loading = true
      this.find.pageNumber = 1
      this.find.recordset = []
      await fetchApiRPC('Dev.TypeMetadata', { TypeTag: this.typeTag })
        .then(async (response) => {
          const metadata = response[0]
          metadata.Fields.map(fieldsMapping)
          const emptyfindFilters = {}
          metadata.Fields
            .filter(field => Object.prototype.hasOwnProperty.call(field, 'componentFilter') && Object.prototype.hasOwnProperty.call(field.componentFilter, 'empty'))
            .forEach(field => {
              emptyfindFilters[field.Tag] = field.componentFilter.empty
            })
          this.findFilters = { ...emptyfindFilters } // редактируемые фильтры
          this.findFiltersCurrent = { ...emptyfindFilters } // фильтры задействованные в фильтрации
          this.type.metadata = metadata
          this.type.loading = false
          await this.findFetch()
        }).catch(error => {
          this.findFilters = null
          this.type.metadata = null
          this.type.loading = false
          showNotify(error)
        })
    },
    async findFetch () {
      if (this.find.loading) {
        return
      }

      this.find.loading = true

      const paramsWithPaging = {
        TypeTag: this.typeTag,
        PageSize: this.find.pageSize,
        PageNumber: this.find.pageNumber
      }

      await fetchApiRPC('Dev.RecordFind', paramsWithPaging)
        .then(response => {
          this.find.pageNumber += 1
          this.find.recordset = this.find.recordset.concat(response)
          this.find.isEOF = response.length < this.find.pageSize
          this.find.loading = false
        }).catch(error => {
          this.find.loading = false
          showNotify(error)
        })
    },
    onScroll ({ to, ref }) {
      if (!this.type.loading && !this.find.loading && !this.find.isEOF && to === this.find.recordset.length - 1) {
        setTimeout(async () => {
          this.findFetch()

          await this.$nextTick(() => {
            ref.refresh()
          })
        }, 0)
      }
    }
  },
  watch: {
    typeTag: async function () {
      await this.typeMetadataFetch()
    }
  },
  async mounted () {
    await this.typeMetadataFetch()
  }
}
</script>

<style lang="sass" scoped>
.r-splitter
  background-color: #fff

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
