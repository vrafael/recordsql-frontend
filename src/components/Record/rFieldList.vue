<template>
  <q-form
    ref="form"
    class="q-pa-md"
    @submit="recordSave"
    @reset="recordReset"
  >
    <template v-if="!!metadataInputs">
      <template v-for="field in metadataInputs">
        <r-field
          v-if="!record"
          :key="field.ID"
          :field="field"
        >
          <q-input
            class="q-field--with-bottom"
            outlined
            dense
          />
        </r-field>
        <component
          v-else
          :is="field.componentInput.component"
          :field="field"
          :key="field.ID"
          :value="record[field.Tag]"
          :origin-value="recordOrigin[field.Tag]"
          :change="recordChange"
        />
      </template>
    </template>

    <div class="row q-pt-md">
      <q-btn
        color="primary"
        type="submit"
        style="width: 140px"
      >
        <!--:disable="recordNotChanged && !!recordOrigin && !!recordOrigin._record"-->
        <q-icon
          left
          name="save"
        />
        Save
      </q-btn>
      <q-space />
      <q-btn-group>
        <q-btn
          color="primary"
          type="reset"
          style="width: 140px"
          :disable="recordNotChanged"
        >
          <q-icon
            left
            name="cancel"
          />
          Cancel
        </q-btn>
        <q-btn
          color="red"
          icon="delete"
          :disable="!recordOrigin || !recordOrigin._record"
          @click="recordDelete"
        />
      </q-btn-group>
    </div>
  </q-form>
</template>

<script>
import rField from './Fields/rField'
import rInputBool from './Fields/rInputBool'
import rInputColor from './Fields/rInputColor'
import rInputDate from './Fields/rInputDate'
import rInputDatetime from './Fields/rInputDatetime'
import rInputTime from './Fields/rInputTime'
import rInputIdentifier from './Fields/rInputIdentifier'
import rInputFloat from './Fields/rInputFloat'
import rInputInt from './Fields/rInputInt'
import rInputBigint from './Fields/rInputBigint'
import rInputMoney from './Fields/rInputMoney'
import rInputString from './Fields/rInputString'
import rInputText from './Fields/rInputText'
import rInputLink from './Fields/rInputLink'
import { isEqual } from 'lodash'

export default {
  components: {
    rField,
    rInputBool,
    rInputColor,
    rInputDate,
    rInputDatetime,
    rInputTime,
    rInputIdentifier,
    rInputFloat,
    rInputInt,
    rInputBigint,
    rInputMoney,
    rInputString,
    rInputText,
    rInputLink
  },
  props: {
    metadataInputs: {
      type: Array,
      required: false,
      default: null
    },
    record: {
      type: Object,
      required: true
    },
    recordOrigin: {
      type: Object,
      required: true
    },
    recordSave: {
      type: Function,
      required: true
    },
    recordDelete: {
      type: Function,
      required: true
    },
    recordReset: {
      type: Function,
      required: true
    },
    recordChange: {
      type: Function,
      required: true
    }
  },
  computed: {
    recordNotChanged () {
      return isEqual(this.record, this.recordOrigin)
    }
  }
}
</script>
