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
        @click="createRecordByType"
      >
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
      :virtual-scroll-item-size="48"
      :virtual-scroll-sticky-size-start="48"
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
              flat
              stack
              no-icon-animation
              padding="0"
              align="center"
              size="sm"
              :color="findFilters[col.name].isChanged ? 'primary' : 'grey'"
              dropdown-icon="filter_list"
              @hide="resetFieldToOrigin(col.name)"
            >
              <q-list>
                <q-item style="max-width: 300px">
                  <component
                    :is="col.filter"
                    :field="fieldByTag(col.name)"
                    :filter="findFilters[col.name]"
                    :filter-current="findFiltersEmpty[col.name]"
                    :filter-update="filterUpdate"
                    :apply-filter="refreshClick"
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
import fieldsMapping from 'src/store/helpers/fieldsMapping'
import showNotify from 'src/common/service.notify'
import rColumnIdentifier from './Columns/rColumnIdentifier'
import { cloneDeep } from 'lodash'
import rHeaderFilterBool from 'components/Find/Header/rHeaderFilterBool'
import rHeaderFilterColor from 'components/Find/Header/rHeaderFilterColor'
import rHeaderFilterDate from 'components/Find/Header/rHeaderFilterDate'
import rHeaderFilterTime from 'components/Find/Header/rHeaderFilterTime'
import rHeaderFilterDatetime from 'components/Find/Header/rHeaderFilterDatetime'
import rHeaderFilterInt from 'components/Find/Header/rHeaderFilterInt'
import rHeaderFilterBigint from 'components/Find/Header/rHeaderFilterBigint'
import rHeaderFilterLink from 'components/Find/Header/rHeaderFilterLink'
import rHeaderFilterMoney from 'components/Find/Header/rHeaderFilterMoney'
import rHeaderFilterString from 'components/Find/Header/rHeaderFilterString'
import rHeaderFilterFloat from 'components/Find/Header/rHeaderFilterFloat'

export default {
  components: {
    rObject,
    rColumnIdentifier,
    rHeaderFilterBool,
    rHeaderFilterColor,
    rHeaderFilterDate,
    rHeaderFilterTime,
    rHeaderFilterDatetime,
    rHeaderFilterInt,
    rHeaderFilterBigint,
    rHeaderFilterLink,
    rHeaderFilterMoney,
    rHeaderFilterString,
    rHeaderFilterFloat
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
      pagination: {
        rowsPerPage: 0
      },
      type: {
        metadata: null,
        loading: false
      },
      findFilters: this.filters, // редактируемые фильтры
      findFiltersCurrent: null, // текущие фильтры
      findFiltersValid: true,
      find: {
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
      this.findFilters[tag] = cloneDeep(this.findFiltersCurrent[tag])
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
          this.findFiltersEmpty = emptyfindFilters
          this.findFilters = JSON.parse(JSON.stringify(emptyfindFilters))
          this.findFiltersCurrent = JSON.parse(JSON.stringify(emptyfindFilters)) // this.findFiltersCurrent = Object.assign({}, emptyfindFilters)
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
    refreshClick () {
      this.find.pageNumber = 1
      this.find.recordset = []
      this.findFetch()
    },
    createRecordByType () {
      this.$router.push(`/record/${this.typeTag}`)
    },
    async findFetch () {
      if (this.find.loading) {
        return
      }

      const fields = this.type.metadata.Fields,
        find = {}

      fields.forEach(field => {
        if (field.componentFilter && this.findFilters[field.Tag].isChanged) {
          if (field.componentFilter.format) {
            find[field.Tag] = field.componentFilter.format(this.findFilters[field.Tag])
          } else {
            find[field.Tag] = this.findFilters[field.Tag]
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
          this.find.recordset = Array.isArray(response)
            ? this.find.recordset.concat(response)
            : []
          this.find.isEOF = response.length < this.find.pageSize
          this.find.loading = false
          this.findFiltersCurrent = JSON.parse(JSON.stringify(this.findFilters)) // Object.assign(this.findFiltersCurrent, this.findFilters)
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
.find-table-sticky-dynamic ::v-deep
  height: 600px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    background-color: #fff

    thead tr th
      position: sticky
      z-index: 1
    thead tr:first-child th
      top: 0px
</style>
