<template>
  <r-header-filter
    :field="field"
    :filter="filter"
    :filter-update="filterUpdate"
  >
    <q-form
      @submit="$emit('apply-filter')"
      class="full-width"
    >
      <q-field
        class="col-12"
        :value="filter.Value"
        label="Object"
        outlined
        dense
        style="min-width: 200px"
        :clearable="filter.Value !== filterCurrent.Value"
        @clear="filterUpdate(this.field.Tag, { Value: null })"
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
      <div class="col-12 q-my-sm">
        <q-btn
          class="full-width"
          color="primary"
          size="md"
          type="submit"
        >
          OK
        </q-btn>
      </div>
    </q-form>
  </r-header-filter>
</template>

<script>
import rHeaderFilter from './rHeaderFilter'
import rObject from 'components/rObject'

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
    selectShow (field, type) {
      this.typeTag = type.TypeTag
      this.selectDialog = true
    },
    selectConfirm (selected) {
      selected.forEach(object => {
        this.objectInsert(object)
      })
      this.selectDialog = false
    }
  },
  watch: {
    filter: {
      handler: function (filter) {
        if (filter.Value !== null) {
          this.filterUpdate(this.field.Tag, { isChanged: this.filter.isChanged = true })
        } else {
          this.filterUpdate(this.field.Tag, { isChanged: this.filter.isChanged = false })
        }
      },
      deep: true
    }
  }
}
</script>
