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
          v-if="value && value.ID"
          :value="value"
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
import { mapActions } from 'vuex'
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
      type: [String, null],
      default: null
    },
    originValue: {
      type: [String, null],
      default: null
    }
  },
  computed: {
    iconsShow: function () {
      return (
        !!this.field && Object.prototype.hasOwnProperty.call(
          this.field, 'Check'
        ) && Object.prototype.hasOwnProperty.call(
          this.field.Check, 'FieldLinkValueType'
        )
      )
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
    compareWithOriginValue () {
      return JSON.stringify(this.value) !== JSON.stringify(this.originValue)
    }
  }
}
</script>
