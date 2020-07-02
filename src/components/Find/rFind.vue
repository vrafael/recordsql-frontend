<template>
  <q-splitter
    v-model="splitter"
    horizontal
    unit="%"
    :limits="[0, 60]"
  >
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
        :data="data"
        :columns="columns"
        row-key="ID"
        class="q-pa-sm"
        dense
        pagination="pagination"
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

export default {
  components: {
    rFilters,
    rObject
  },
  data () {
    return {
      splitter: 40,
      splitterRestore: null,
      pagination: {
        rowsNumber: 0
      },
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
    }
  }
}
</script>
