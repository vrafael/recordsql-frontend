<template>
  <r-field :field="field">
    <q-field
      :value="value"
      @change="event => updateFieldDataOnChange(event.target.value)"
      class="q-field--with-bottom"
      outlined
      dense
      :clearable="compareWithOriginValue()"
    >
      <template
        #control
        class="items-center"
      >
        <r-object
          v-if="value"
          :value="value"
          style="max-width: 150px;"
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
  </r-field>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import rField from './rField'
import rObject from '../../rObject'

export default {
  components: {
    rField,
    rObject
  },
  props: {
    field: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapGetters(['RECORD_GET', 'RECORD_ORIGIN_GET']),
    iconsShow: function () {
      return !!this.field && Object.prototype.hasOwnProperty.call(this.field, 'Check') && Object.prototype.hasOwnProperty.call(this.field.Check, 'FieldLinkValueType')
    }
  },
  data: () => ({
    types: [{
      TypeID: 10,
      TypeName: 'Рыбка',
      TypeIcon: 'las la-fish',
      TypeTag: 'Fish',
      TypeOwnerID: 1
    }, {
      TypeID: 11,
      TypeName: 'Гиппопотам',
      TypeIcon: 'las la-hippo',
      TypeTag: 'Hippo',
      TypeOwnerID: 1
    }]
  }),
  methods: {
    ...mapActions(['RECORD_STATE_UPDATE_FIELD']),
    updateFieldDataOnChange (eventValue) {
      const obj = { [`${this.field.Tag}`]: eventValue }
      this.RECORD_STATE_UPDATE_FIELD(obj)
    },
    compareWithOriginValue () {
      const fieldTag = this.field.Tag.toString()
      const localState = JSON.stringify(this.RECORD_GET[fieldTag])
      const originState = JSON.stringify(this.RECORD_ORIGIN_GET[fieldTag])
      return localState !== originState
    }
  }
}
</script>
