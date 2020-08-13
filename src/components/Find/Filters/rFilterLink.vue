<template>
  <r-filter
    :field="field"
    :filter="filter"
  >
    <q-field
      class="col-9 q-field--with-bottom"
      :value="filter.Value"
      :disable="!filter.Enable"
      outlined
      dense
      :clearable="filter.Value !== filterOrigin.Value"
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
          :remove="removeObject"
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
                :key="type.ID"
                clickable
                v-close-popup
                context-menu
              >
                <div
                  class="row items-center"
                  style="width:200px"
                >
                  <q-icon
                    :name="type.Icon"
                    color="accent"
                    size="28px"
                    class="q-mr-sm"
                  />
                  <div class="text-weight-bold text-primary">
                    {{ `${type.Name}...` }}
                  </div>
                </div>
              </q-item>
            </q-list>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-field>
  </r-filter>
</template>

<script>
import rFilter from './rFilter'
import { mapActions } from 'vuex'
import rObject from '../../rObject'

export default {
  components: {
    rFilter,
    rObject
  },
  props: {
    field: {
      type: Object,
      required: true
    },
    filter: {
      type: Object,
      required: true
    },
    filterOrigin: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions([
      'FILTER_STATE_UPDATE_FIELD'
    ]),
    reset () {
      const filter = { ...this.filter }
      filter.Value = this.filterOrigin.Value
      const obj = { [`${this.field.Tag}`]: filter }
      this.FILTER_STATE_UPDATE_FIELD(obj)
    },
    insertObject (object) {
      const filter = { ...this.filter }
      if (filter.Value) {
        const index = filter.Value.indexOf(object)
        if (index === -1) {
          filter.Value.push(object)
        }
      } else {
        filter.Value = [object]
      }
      const obj = { [`${this.field.Tag}`]: filter }
      this.FILTER_STATE_UPDATE_FIELD(obj)
    },
    removeObject (object) {
      const filter = { ...this.filter }
      if (filter.Value) {
        const index = filter.Value.indexOf(object)
        if (index !== -1) {
          filter.Value.splice(index, 1)
        }
      }
      const obj = { [`${this.field.Tag}`]: filter }
      this.FILTER_STATE_UPDATE_FIELD(obj)
    }
  }
}
</script>
