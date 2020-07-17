<template>
  <q-splitter
    v-model="splitter"
    horizontal
    unit="%"
    :limits="[0, 60]"
  >
    <q-inner-loading :showing="TYPE_METADATA_LOADING_STATE_GET()">
      <q-spinner-gears
        size="50px"
        color="primary"
      />
    </q-inner-loading>

    <template #before>
      <r-filters />
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
        :data="FIND_GET()"
        :columns="TYPE_METADATA_COLUMNS_GET()"
        row-key="TYPE_METADATA_IDENTIFIER_GET()"
        class="q-pa-sm"
        dense
        pagination=""
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
import rFilters from './rFilters'
import rObject from '../rObject'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    rFilters,
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
      columns: [
        {
          name: 'ID',
          required: true,
          label: 'ID',
          field: row => row.ID,
          sortable: true,
          align: 'right'
        }, {
          name: 'Type',
          label: 'Тип',
          field: 'Type', // row => row.Type.Name,
          align: 'left'
        }, {
          name: 'State',
          label: 'Состояние',
          field: 'State',
          align: 'left'
        }, {
          name: 'Name',
          label: 'Имя',
          field: 'Name',
          align: 'left'
        }
      ],
      data: [
        {
          ID: 194,
          Type: {
            ID: 54,
            TypeID: 5,
            TypeName: 'Тип справочника',
            TypeIcon: 'las la-th-large',
            StateName: 'Сформирован',
            StateColor: 'green',
            Name: 'Хранимая процедура',
            Icon: 'las la-code'
          },
          State: {
            ID: 96,
            TypeID: 46,
            TypeName: 'Состояние',
            TypeIcon: 'las la-bookmark',
            StateName: 'Сформирован',
            StateColor: 'green',
            Name: 'Сформирован'
          },
          Name: 'Dev.Swagger'
        },
        {
          ID: 193,
          Type: {
            ID: 54,
            TypeID: 5,
            TypeName: 'Тип справочника',
            TypeIcon: 'las la-th-large',
            StateName: 'Сформирован',
            StateColor: 'green',
            Name: 'Хранимая процедура',
            Icon: 'las la-code'
          },
          State: {
            ID: 96,
            TypeID: 46,
            TypeName: 'Состояние',
            TypeIcon: 'las la-bookmark',
            StateName: 'Сформирован',
            StateColor: 'green',
            Name: 'Сформирован'
          },
          Name: 'Dev.RecordDel'
        },
        {
          ID: 192,
          Type: {
            ID: 54,
            TypeID: 5,
            TypeName: 'Тип справочника',
            TypeIcon: 'las la-th-large',
            StateName: 'Сформирован',
            StateColor: 'green',
            Name: 'Хранимая процедура',
            Icon: 'las la-code'
          },
          State: {
            ID: 96,
            TypeID: 46,
            TypeName: 'Состояние',
            TypeIcon: 'las la-bookmark',
            StateName: 'Сформирован',
            StateColor: 'green',
            Name: 'Сформирован'
          },
          Name: 'Dev.RecordFind'
        }
      ]
    }
  },
  methods: {
    ...mapActions(['TYPE_METADATA_FETCH', 'FIND_FETCH']),
    ...mapGetters(['TYPE_METADATA_LOADING_STATE_GET', 'TYPE_METADATA_COLUMNS_GET', 'TYPE_METADATA_IDENTIFIER_GET', 'FIND_GET']),
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
      await this.TYPE_METADATA_FETCH({ TypeID: this.typeID })
      await this.FIND_FETCH({ TypeID: this.typeID })
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
