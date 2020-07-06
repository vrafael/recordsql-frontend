<template>
  <q-form class="q-pa-md">
    <r-input-link />
    <r-input-text />
    <r-input-string />
    <r-input-money />
    <r-input-bigint />
    <r-input-int />
    <r-input-float />
    <r-input-identifier />
    <r-input-time />
    <r-input-datetime />
    <r-input-date />
    <r-input-color />
    <r-input-bool />

    <div class="row q-pt-md">
      <q-btn
        color="primary"
        style="width: 140px"
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
        />
      </q-btn-group>
    </div>
  </q-form>
</template>

<script>
import { mapGetters } from 'vuex'

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
  async mounted () {
    const recordID = Number(this.$route.params.id)
    await this.$store.dispatch('RECORD_FETCH', { ID: recordID, TypeID: 54 })
    // console.log(this.$store.getters.RECORD_GET)
  },
  computed: mapGetters(['RECORD_GET'])
}
</script>
