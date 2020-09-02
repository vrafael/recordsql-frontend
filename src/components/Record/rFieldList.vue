<template>
  <q-form
    ref="form"
    class="q-pa-md"
    @submit="RECORD_UPLOAD()"
    @reset="reset()"
  >
    <template v-if="!!TYPE_METADATA_INPUTS_GET">
      <template v-for="field in TYPE_METADATA_INPUTS_GET">
        <r-field
          v-if="!RECORD_GET"
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
          :value="RECORD_GET[field.Tag]"
          :origin-value="RECORD_ORIGIN_GET[field.Tag]"
        />
      </template>
    </template>

    <div class="row q-pt-md">
      <q-btn
        color="primary"
        type="submit"
        style="width: 140px"
        :disable="recordNotChanged() && (!TYPE_METADATA_IDENTIFIER_GET || !RECORD_GET || !!RECORD_GET[TYPE_METADATA_IDENTIFIER_GET])"
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
          type="reset"
          style="width: 140px"
          :disable="recordNotChanged()"
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
          :disable="!TYPE_METADATA_IDENTIFIER_GET || !RECORD_GET || !RECORD_GET[TYPE_METADATA_IDENTIFIER_GET]"
          @click="del()"
        />
      </q-btn-group>
    </div>
  </q-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
  computed: {
    ...mapGetters([
      'TYPE_METADATA_INPUTS_GET',
      'RECORD_GET',
      'RECORD_ORIGIN_GET',
      'RECORD_LOADING_GET',
      'TYPE_METADATA_IDENTIFIER_GET'
    ])
  },
  methods: {
    ...mapActions([
      'RECORD_UPLOAD',
      'RECORD_DELETE',
      'RECORD_RESET_STATE_TO_ORIGIN'
    ]),
    recordNotChanged () {
      return isEqual(this.RECORD_GET, this.RECORD_ORIGIN_GET)
    },
    reset () {
      this.RECORD_RESET_STATE_TO_ORIGIN()
      this.$refs.form.resetValidation()
    },
    del () {
      this.RECORD_DELETE()
    }
  }
}
</script>
