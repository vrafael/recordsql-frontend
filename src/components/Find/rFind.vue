<template>
  <div class="bg-white">
    <div class="q-gutter-sm q-pa-sm">
      <q-btn
        color="primary"
        v-if="!!selectConfirm"
        :disable="selection.selected.length === 0"
        @click="selectClick"
      >
        <q-icon
          left
          name="check"
        />
        OK
      </q-btn>
      <q-btn
        color="primary"
        :to="{ name: 'record', params: { typeTag }}"
        v-if="!typeMetadataAbstract && !!type.metadata.State"
      >
        <!--ToDo q-btn-dropdown with ChildrenTypes -->
        <q-icon
          left
          name="add"
        />
        Create
      </q-btn>
    </div>
    <q-table
      :data="findRecordset()"
      :columns="getTypeMetadataColumns()"
      :row-key="typeMetadataIdentifier"
      :loading="find.loading"
      class="q-pa-sm find-table-sticky-dynamic"
      dense
      virtual-scroll
      :virtual-scroll-item-size="31"
      :virtual-scroll-sticky-size-start="31"
      @virtual-scroll="onScroll"
      :pagination="pagination"
      :rows-per-page-options="[0]"
      :selection="selection.type"
      :selected.sync="selection.selected"
    >
      <template #header="props">
        <q-tr :props="props">
          <q-th
            v-if="selection.type !== 'none'"
            auto-width
          >
            <q-checkbox
              v-model="props.selected"
              dense
            />
          </q-th>
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
            <q-btn-dropdown
              v-if="col.filter"
              v-model="filtersDropdown[col.name]"
              flat
              split
              no-icon-animation
              padding="0"
              align="center"
              size="sm"
              :color="find.filtersCurrent[col.name].isEnabled ? 'primary' : 'grey'"
              dropdown-icon="filter_list"
              @before-show="resetFieldToOrigin(col.name)"
            >
              <q-list>
                <q-item style="max-width: 300px">
                  <component
                    :is="col.filter"
                    :field="fieldByTag(col.name)"
                    :filter="find.filters[col.name]"
                    :filter-current="find.filtersCurrent[col.name]"
                    :filter-update="filterUpdate"
                    :filter-apply="filterApply"
                  />
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-th>
        </q-tr>
      </template>
      <template #body="props">
        <q-tr :props="props">
          <q-td v-if="selection.type !== 'none'">
            <q-checkbox
              v-model="props.selected"
              dense
            />
          </q-td>
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
  </div>
</template>

<script>
import rObject from '../rObject'
import fetchApiRPC from 'src/common/service.api.rpc'
import fieldsMapping from 'src/common/fieldsMapping'
import { Notify } from 'quasar'
import rColumnIdentifier from './Columns/rColumnIdentifier'

export default {
  components: {
    rObject,
    rColumnIdentifier,
    rHeaderFilterBool: () => import('./Header/rHeaderFilterBool'),
    rHeaderFilterColor: () => import('./Header/rHeaderFilterColor'),
    rHeaderFilterDate: () => import('./Header/rHeaderFilterDate'),
    rHeaderFilterTime: () => import('./Header/rHeaderFilterTime'),
    rHeaderFilterDatetime: () => import('./Header/rHeaderFilterDatetime'),
    rHeaderFilterInt: () => import('./Header/rHeaderFilterInt'),
    rHeaderFilterBigint: () => import('./Header/rHeaderFilterBigint'),
    rHeaderFilterLink: () => import('./Header/rHeaderFilterLink'),
    rHeaderFilterMoney: () => import('./Header/rHeaderFilterMoney'),
    rHeaderFilterString: () => import('./Header/rHeaderFilterString'),
    rHeaderFilterFloat: () => import('./Header/rHeaderFilterFloat')
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
    },
    selectMultiple: {
      type: Boolean,
      required: false,
      default: false
    },
    selectConfirm: {
      type: Function,
      required: false,
      default: null
    }
  },
  data () {
    return {
      expanded: false,
      splitter: {
        value: 0,
        restore: 40
      },
      type: {
        metadata: null,
        loading: false
      },
      pagination: {
        rowsPerPage: 0
      },
      filtersDropdown: {},
      find: {
        filters: this.filters, // редактируемые фильтры
        filtersCurrent: null,
        recordset: [],
        loading: false,
        pageSize: 50,
        pageNumber: 1,
        isEOF: false // достигнут конец списка
      },
      selection: {
        type: this.selectConfirm ? (this.selectMultiple ? 'multiple' : 'single') : 'none',
        selected: []
      }
    }
  },
  computed: {
    typeMetadataIcon () {
      if (this.type.metadata && Object.prototype.hasOwnProperty.call(this.type.metadata, 'Icon')) {
        return this.type.metadata.Icon
      }
      return null
    },
    typeMetadataAbstract () {
      if (this.type.metadata && Object.prototype.hasOwnProperty.call(this.type.metadata, 'Abstract')) {
        return this.type.metadata.Abstract
      }
      return null
    },
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
    }
  },
  methods: {
    resetFieldToOrigin (tag) {
      this.find.filters[tag] = JSON.parse(JSON.stringify(this.find.filtersCurrent[tag]))
    },
    fieldByTag (tag) {
      return this.type.metadata.Fields.find(field => field.Tag === tag)
    },
    getTypeMetadataColumns () {
      if (this.type.metadata && this.type.metadata.Fields) {
        const _columns = this.type.metadata.Fields.filter(field => field.componentColumn)
        if (_columns.length > 0) {
          return _columns.map(field => field.componentColumn)
        }
      }
      return []
    },
    selectClick () {
      if (this.selectConfirm) {
        const selected = this.selection.selected.map(item => item._object)
        this.selectConfirm(selected)
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
        this.find.filters[field][property] = JSON.parse(JSON.stringify(filter[property]))
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
          const emptyFindFilters = Object.assign({}, this.filters)
          metadata.Fields
            .filter(field => Object.prototype.hasOwnProperty.call(field, 'componentFilter') && Object.prototype.hasOwnProperty.call(field.componentFilter, 'empty'))
            .forEach(field => {
              emptyFindFilters[field.Tag] = Object.assign(field.componentFilter.empty, emptyFindFilters[field.Tag])
            })
          this.find.filters = JSON.parse(JSON.stringify(emptyFindFilters))
          this.find.filtersCurrent = JSON.parse(JSON.stringify(emptyFindFilters)) // this.find.filtersCurrent = Object.assign({}, emptyFindFilters)
          this.type.metadata = metadata
          this.type.loading = false
          await this.findFetch()
        }).catch(err => {
          this.find.filters = null
          this.type.metadata = null
          this.type.loading = false
          Notify.create({ type: err.type, message: err.message, timeout: err.timeout })
        })
    },
    filterApply (fieldTag) {
      this.filtersDropdown[fieldTag] = false
      this.refresh()
    },
    filterClose (fieldTag) {
      this.resetFieldToOrigin(fieldTag)
      this.filtersDropdown[fieldTag] = false
    },
    refresh () {
      this.find.pageNumber = 1
      this.find.recordset = []
      this.findFetch()
    },
    async findFetch () {
      if (this.find.loading) {
        return
      }

      const fields = this.type.metadata.Fields,
        find = {}

      fields.forEach(field => {
        if (field.componentFilter && this.find.filters[field.Tag].isEnabled) {
          if (field.componentFilter.format) {
            find[field.Tag] = field.componentFilter.format(JSON.parse(JSON.stringify(this.find.filters[field.Tag])))
          } else {
            find[field.Tag] = JSON.parse(JSON.stringify(this.find.filters[field.Tag]))
          }
        }
      })

      const paramsWithPaging = {
        Find: Object.keys(find).length > 0 ? find : null,
        TypeTag: this.typeTag,
        PageSize: this.find.pageSize,
        PageNumber: this.find.pageNumber
      }

      this.find.loading = true

      await fetchApiRPC('Dev.RecordFind', paramsWithPaging)
        .then(response => {
          this.find.pageNumber += 1
          if (Array.isArray(response)) {
            this.find.recordset = this.find.recordset.concat(response)
          }
          this.find.isEOF = response.length < this.find.pageSize
          this.find.loading = false
          this.find.filtersCurrent = JSON.parse(JSON.stringify(this.find.filters)) // Object.assign(this.find.filtersCurrent, this.find.filters)
        }).catch(err => {
          this.find.loading = false
          Notify.create({ type: err.type, message: err.message, timeout: err.timeout })
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
.find-table-sticky-dynamic ::v-deep
  max-height: 80vh

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    background-color: #fff

    thead tr th
      position: sticky
      z-index: 1
    thead tr:last-child th
      /* height of all previous header rows */
      top: 31px
    thead tr:first-child th
      top: 0px
</style>
