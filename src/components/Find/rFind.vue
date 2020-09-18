<template>
  <div class="bg-white ">
    <q-form
      class="q-ma-sm"
      ref="filterForm"
      @submit="refreshClick"
      @reset="resetClick"
    >
      <q-expansion-item
        header-class="bg-linear text-white"
        class="shadow-1 overflow-hidden"
        style="border-radius: 5px"
        v-model="expanded"
        expand-icon-class="text-white"
      >
        <template #header>
          <div class="q-gutter-sm row items-center">
            <q-avatar
              :icon="typeMetadataIcon"
              font-size="23px"
              color="grey-4"
              text-color="accent"
              size="md"
              rounded
            />
            <span>
              {{ type.metadata ? type.metadata.Name : typeTag }}
            </span>
            <q-space />
          </div>
        </template>
        <q-inner-loading :showing="type.loading">
          <q-spinner-gears
            size="50px"
            color="primary"
          />
        </q-inner-loading>
        <div class="q-pa-sm">
          <template
            v-if="!!type.metadata && !!typeMetadataFilters"
            class="q-ma-sm q-pa-sm"
          >
            <component
              v-for="field in typeMetadataFilters"
              :is="field.componentFilter.component"
              :field="field"
              :key="field.ID"
              :filter="findFilters[field.Tag]"
              :filter-current="findFiltersEmpty[field.Tag]"
              :filter-update="filterUpdate"
            />
          </template>
        </div>
      </q-expansion-item>
      <div class="q-gutter-sm q-pa-sm">
        <q-btn
          color="primary"
          v-if="!!selectConfirm"
          :disable="selection.selected.length == 0"
          @click="selectClick"
        >
          <q-icon
            left
            name="check"
          />
          OK
        </q-btn>
        <q-btn
          :color="filtersChanged ? 'accent': 'primary'"
          type="submit"
        >
          <q-icon
            left
            :name="filtersEmpty ? 'refresh' : 'search'"
          />
          Refresh
        </q-btn>
        <q-btn
          color="primary"
          type="reset"
          flat
          :disable="!!filtersEmpty"
        >
          <q-icon
            left
            name="clear"
          />
          Reset
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
    </q-form>
    <q-table
      :data="findRecordset()"
      :columns="typeMetadataColumns"
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
      <template #body="props">
        <q-tr :props="props">
          <q-td v-if="selection.type !== 'none'">
            <q-checkbox
              class="q-checkbox--dense"
              v-model="props.selected"
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
import { Notify } from 'quasar'
import rColumnIdentifier from './Columns/rColumnIdentifier'
import { isEqual } from 'lodash'

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
    rObject,
    rColumnIdentifier,

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
    typeMetadataIcon () {
      if (this.type.metadata && Object.prototype.hasOwnProperty.call(this.type.metadata, 'Icon')) {
        return this.type.metadata.Icon
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
    },
    typeMetadataFilters () {
      return this.type.metadata.Fields ? this.type.metadata.Fields.filter(field => field.componentFilter) : null
    },
    filtersChanged () {
      return !isEqual(this.findFilters, this.findFiltersCurrent)
    },
    filtersEmpty () {
      return isEqual(this.findFilters, this.findFiltersEmpty)
    }
  },
  methods: {
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
          const emptyFindFilters = Object.assign({}, this.filters)
          metadata.Fields
            .filter(field => Object.prototype.hasOwnProperty.call(field, 'componentFilter') && Object.prototype.hasOwnProperty.call(field.componentFilter, 'empty'))
            .forEach(field => {
              emptyFindFilters[field.Tag] = Object.assign(field.componentFilter.empty, emptyFindFilters[field.Tag])
            })
          this.findFiltersEmpty = emptyFindFilters
          this.findFilters = JSON.parse(JSON.stringify(emptyFindFilters))
          this.findFiltersCurrent = JSON.parse(JSON.stringify(emptyFindFilters)) // this.findFiltersCurrent = Object.assign({}, emptyfindFilters)
          this.type.metadata = metadata
          this.type.loading = false
          await this.findFetch()
        }).catch(err => {
          this.findFilters = null
          this.type.metadata = null
          this.type.loading = false
          Notify.create({ type: err.type, message: err.message, timeout: err.timeout })
        })
    },
    refreshClick () {
      this.find.pageNumber = 1
      this.find.recordset = []
      this.findFetch()
    },
    resetClick () {
      if (!isEqual(this.findFilters, this.findFiltersEmpty)) {
        this.findFilters = JSON.parse(JSON.stringify(this.findFiltersEmpty))
      }
    },
    createRecordByType () {
      this.$router.push({ name: 'record', params: { typeTag: this.typeTag } })
    },
    async findFetch () {
      if (this.find.loading) {
        return
      }

      const fields = this.type.metadata.Fields,
        find = {}

      fields.forEach(field => {
        if (field.componentFilter && this.findFilters[field.Tag].Enable) {
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
          this.find.recordset = this.find.recordset.concat(response)
          this.find.isEOF = response.length < this.find.pageSize
          this.find.loading = false
          this.findFiltersCurrent = JSON.parse(JSON.stringify(this.findFilters)) // Object.assign(this.findFiltersCurrent, this.findFilters)
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
