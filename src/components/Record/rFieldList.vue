<template>
  <q-form class="q-pa-md">
    <template v-if="!!TYPE_METADATA_INPUTS_GET && !!RECORD_GET">
      <component
        v-for="field in TYPE_METADATA_INPUTS_GET"
        :is="field.componentInput"
        :field="field"
        :key="field.ID"
        :value="RECORD_GET[field.Tag]"
      />
    </template>

    <div class="row q-pt-md">
      <q-btn
        color="primary"
        style="width: 140px"
        :disable="compareState()"
        @click="setObj()"
      >
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
          style="width: 140px"
          :disable="compareState()"
          @click="resetFieldsValueToOrigin()"
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
          @click="deleteObj()"
        />
      </q-btn-group>
    </div>
  </q-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

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

export default {
  components: {
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
  computed: {
    ...mapGetters(['TYPE_METADATA_INPUTS_GET', 'RECORD_GET', 'RECORD_ORIGIN_GET', 'RECORD_COMPARE_STATE'])
  },
  methods: {
    ...mapActions([
      'RECORD_UPLOAD',
      'RECORD_DELETE',
      'RECORD_RESET_STATE_TO_ORIGIN'
    ]),
    compareState () {
      const localState = JSON.stringify(this.RECORD_GET)
      const originState = JSON.stringify(this.RECORD_ORIGIN_GET)
      return localState === originState
    },
    setObj () {
      this.RECORD_UPLOAD(this.RECORD_GET)
      // this.RECORD_GET
    },
    deleteObj (key) {
      // const record = this.RECORD_GET
      // this.RECORD_DELETE()
    },
    resetFieldsValueToOrigin () {
      this.RECORD_RESET_STATE_TO_ORIGIN()
    }
  }
}
</script>
