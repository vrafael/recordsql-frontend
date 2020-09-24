<template>
  <r-filter
    :field="field"
    :filter="filter"
    :filter-update="filterUpdate"
  >
    <q-field
      class="col-9 q-field--with-bottom"
      :value="filter.Value"
      :disable="!filter.Enable"
      outlined
      dense
      :clearable="filter.Value !== filterCurrent.Value"
      @clear="reset"
    >
      <template
        #control
        class="items-center"
      >
        <r-object
          v-for="object in filter.Value"
          :key="object.ID"
          :value="object"
          :remove="objectRemove"
          style="max-width: 200px;"
        />
      </template>
      <template #append>
        <q-icon
          name="search"
          class="cursor-pointer"
          v-if="iconsShow"
        >
          <q-popup-proxy>
            <q-list>
              <q-item
                v-for="type in field.Check.LinkRelationships"
                :key="type.TypeID"
                v-close-popup
                context-menu
              >
                <div
                  class="row items-center cursor-pointer"
                  style="width:200px"
                  @click="selectShow(type)"
                >
                  <q-icon
                    :name="type.TypeIcon"
                    color="accent"
                    size="28px"
                    class="q-mr-sm"
                  />
                  <div class="text-weight-bold text-primary">
                    {{ `${type.TypeName}...` }}
                  </div>
                </div>
              </q-item>
            </q-list>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-field>
    <template v-if="selectDialog">
      <q-dialog
        v-model="selectDialog"
        full-width
      >
        <r-find
          :type-tag="typeTag"
          :select-multiple="true"
          :select-confirm="selectConfirm"
        />
      </q-dialog>
    </template>
  </r-filter>
</template>

<script>
import rFilter from './rFilter'
import rObject from 'src/components/rObject'

export default {
  components: {
    rFilter,
    rObject,
    rFind: () => import('../rFind') // без этого ошибка
  },
  data: () => ({
    selectDialog: false,
    typeTag: null
  }),
  props: {
    field: {
      type: Object,
      required: true
    },
    filter: {
      type: Object,
      required: true
    },
    filterCurrent: {
      type: Object,
      required: true
    },
    filterUpdate: {
      type: Function,
      required: true
    }
  },
  computed: {
    iconsShow: function () {
      return (!!this.field &&
        Object.prototype.hasOwnProperty.call(this.field, 'Check') &&
        Object.prototype.hasOwnProperty.call(this.field.Check, 'LinkRelationships')
      )
    }
  },
  methods: {
    reset () {
      this.filterUpdate(this.field.Tag, { Value: this.filterCurrent.Value })
    },
    objectInsert (object) {
      let value = null
      if (this.filter.Value) {
        value = this.filter.Value.slice()
        const index = value.indexOf(object)
        if (index === -1) {
          value.push(object)
        }
      } else {
        value = [object]
      }
      this.filterUpdate(this.field.Tag, { Value: value })
    },
    objectRemove (object) {
      const value = this.filter.Value
      if (value) {
        const index = value.indexOf(object)
        if (index !== -1) {
          value.splice(index, 1)
        }
      }
      this.filterUpdate(this.field.Tag, { Value: value })
    },
    selectShow (type) {
      this.typeTag = type.TypeTag
      this.selectDialog = true
    },
    selectConfirm (selected) {
      selected.forEach(object => {
        this.objectInsert(object)
      })
      this.selectDialog = false
    }
  }
}
</script>
