<template>
  <q-form class="q-pa-md">
    <r-field-identity />

    <r-field-link
      label="Type"
      input-icon="mdi-format-list-bulleted-type"
      dropdown-icon="mdi-format-list-bulleted-type"
    />

    <r-field-link
      label="State"
      input-icon="mdi-state-machine"
      dropdown-icon="mdi-state-machine"
    />

    <r-field-link
      label="Currency"
      input-icon="mdi-currency-usd"
      dropdown-icon="mdi-currency-usd"
    />

    <r-field-string />
    <r-field-text />
    <r-field-money />
    <r-field-datetime />
    <r-field-bool />
    <r-field-color />
    <r-field-date />
    <r-field-time />
    <r-field-int />
    <r-field-float />

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

import rFieldBool from './Fields/rFieldBool'
import rFieldColor from './Fields/rFieldColor'
import rFieldDate from './Fields/rFieldDate'
import rFieldDatetime from './Fields/rFieldDatetime'
import rFieldIdentity from './Fields/rFieldIdentity'
import rFieldInt from './Fields/rFieldInt'
import rFieldMoney from './Fields/rFieldMoney'
import rFieldString from './Fields/rFieldString'
import rFieldText from './Fields/rFieldText'
import rFieldTime from './Fields/rFieldTime'
import rFieldFloat from './Fields/rFieldFloat'
import rFieldLink from './Fields/rFieldLink'

export default {
  components: {
    rFieldBool,
    rFieldColor,
    rFieldDate,
    rFieldDatetime,
    rFieldIdentity,
    rFieldInt,
    rFieldMoney,
    rFieldString,
    rFieldText,
    rFieldTime,
    rFieldFloat,
    rFieldLink
  },
  async mounted () {
    const recordID = Number(this.$route.params.id)
    await this.$store.dispatch('RECORD_FETCH', { ID: recordID, TypeID: 54 })
    // console.log(this.$store.getters.RECORD_GET)
  },
  computed: mapGetters(['RECORD_GET'])
}
</script>
