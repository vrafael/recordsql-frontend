<template>
  <r-header-filter
    :field="field"
    :filter-apply="filterApply"
  >
    <q-field
      class="col-12"
      :value="filter.Value"
      label="Object"
      outlined
      dense
      style="min-width: 200px"
      clearable
      @clear="clear"
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
          style="max-width: 200px; margin-top: 4px; margin-bottom: 4px"
        />
      </template>
      <template #append>
        <q-icon
          name="search"
          class="cursor-pointer"
          v-if="!!field && field.hasOwnProperty('Check') && field.Check.hasOwnProperty('LinkRelationships')"
        >
          <q-popup-proxy>
            <q-list>
              <q-item
                v-for="type in field.Check.LinkRelationships"
                :key="type.TypeID"
                clickable
                v-close-popup
                @click="selectShow(field, type)"
                context-menu
              >
                <div
                  class="row items-center"
                  style="min-width: 200px;"
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
  </r-header-filter>
</template>

<script>
import rHeaderFilter from './rHeaderFilter'
import rObject from 'components/rObject'
import { unionWith, isEqual } from 'lodash'

export default {
  components: {
    rHeaderFilter,
    rObject,
    rFind: () => import('../rFind') // без этого ошибка
  },
  data: () => ({
    selectField: null,
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
    filterUpdate: {
      type: Function,
      required: true
    },
    filterApply: {
      type: Function,
      required: true
    }
  },
  methods: {
    clear () {
      setTimeout(() => { this.filterUpdate(this.field.Tag, { Value: null }) }, 200) // костыль
    },
    objectRemove (object) {
      let value = null
      if (this.filter.Value) {
        value = this.filter.Value.slice()
        const index = value.indexOf(object)
        if (index !== -1) {
          value.splice(index, 1)
        }
        if (value.length === 0) {
          value = null
        }
      }
      setTimeout(() => { this.filterUpdate(this.field.Tag, { Value: value }) }, 200) // костыль
    },
    selectShow (field, type) {
      this.typeTag = type.TypeTag
      this.selectDialog = true
    },
    selectConfirm (selected) {
      const value = unionWith(this.filter.Value, selected, isEqual)
      this.filterUpdate(this.field.Tag, { Value: value })
      setTimeout(() => { this.selectDialog = false }, 200) // костыль
    }
  },
  watch: {
    filter: {
      handler: function (filter) {
        if (filter.Value === null) {
          this.filterUpdate(this.field.Tag, { isEnabled: false })
        } else {
          this.filterUpdate(this.field.Tag, { isEnabled: true })
        }
      },
      deep: true
    }
  }
}
</script>
