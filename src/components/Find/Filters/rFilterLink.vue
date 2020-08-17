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
          v-if="!!field && field.hasOwnProperty('Check') && field.Check.hasOwnProperty('FieldLinkValueType')"
        >
          <q-popup-proxy>
            <q-list>
              <q-item
                v-for="type in field.Check.FieldLinkValueType"
                :key="type.TypeID"
                clickable
                v-close-popup
                @click="showSearch(field, type)"
                context-menu
              >
                <div
                  class="row items-center"
                  style="width:200px"
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
    <q-dialog
      v-model="searchDialog"
      full-height
    >
      <r-find :type-tag="typeTag" />
    </q-dialog>
  </r-filter>
</template>

<script>
import rFilter from './rFilter'
import rObject from 'src/components/rObject'
import rFind from '../rFind'

export default {
  components: {
    rFilter,
    rObject,
    rFind
  },
  data: () => ({
    searchDialog: false,
    typeTag: null,
    searchField: null
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
  methods: {
    reset () {
      this.filterUpdate(this.field.Tag, { Value: this.filterCurrent.Value })
    },
    objectInsert (object) {
      let value = this.filter.value
      if (value) {
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
      const value = this.filter.value
      if (value) {
        const index = value.indexOf(object)
        if (index !== -1) {
          value.splice(index, 1)
        }
      }
      this.filterUpdate(this.field.Tag, { Value: value })
    },
    showSearch (field, type) {
      this.typeTag = type.TypeTag
      this.searchDialog = true
    }
  }
}
</script>
