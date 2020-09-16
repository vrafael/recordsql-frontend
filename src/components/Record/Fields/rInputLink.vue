<template>
  <r-field :field="field">
    <q-field
      :value="value"
      @change="event => updateFieldDataOnChange(event.target.value)"
      class="q-field--with-bottom"
      outlined
      dense
      :clearable="recordChanged"
      @clear="() => updateFieldDataOnChange(originValue)"
    >
      <template
        #control
        class="items-center"
      >
        <r-object
          v-if="value && value.ID"
          :value="value"
          :remove="objectRemove"
        />
      </template>
      <template #append>
        <q-icon
          v-if="iconsShow"
          name="search"
          class="cursor-pointer"
        >
          <q-popup-proxy>
            <q-list>
              <q-item
                v-for="type in field.Check.LinkValueTypes"
                :key="type.TypeID"
                v-close-popup
                @click="selectShow(type)"
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
    <template v-if="selectDialog">
      <q-dialog
        v-model="selectDialog"
        full-width
      >
        <r-find
          :type-tag="typeTag"
          :select-multiple="false"
          :select-confirm="selectConfirm"
        />
      </q-dialog>
    </template>
  </r-field>
</template>

<script>
import { mapActions } from 'vuex'
import rField from './rField'
import rObject from '../../rObject'
import { isEqual } from 'lodash'

export default {
  components: {
    rField,
    rObject,
    rFind: () => import('src/components/Find/rFind') // без этого ошибка
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
    value: {
      type: Object,
      default: null
    },
    originValue: {
      type: Object,
      default: null
    }
  },
  computed: {
    iconsShow: function () {
      return (!!this.field &&
        Object.prototype.hasOwnProperty.call(this.field, 'Check') &&
        Object.prototype.hasOwnProperty.call(this.field.Check, 'LinkValueTypes')
      )
    },
    recordChanged () {
      return !isEqual(this.value, this.originValue)
    }
  },
  methods: {
    ...mapActions([
      'RECORD_STATE_UPDATE_FIELD'
    ]),
    updateFieldDataOnChange (eventValue) {
      const obj = { [`${this.field.Tag}`]: eventValue }
      this.RECORD_STATE_UPDATE_FIELD(obj)
    },
    objectRemove () {
      this.updateFieldDataOnChange(null)
    },
    selectShow (type) {
      this.typeTag = type.TypeTag
      this.selectDialog = true
    },
    selectConfirm (selected) {
      let obj = null
      if (selected && selected.length > 0) {
        obj = selected[0]
      }
      this.updateFieldDataOnChange(obj)
      this.selectDialog = false
    }
  }
}
</script>
