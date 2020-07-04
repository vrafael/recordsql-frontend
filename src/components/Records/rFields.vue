<template>
  <q-form class="q-pa-md">
    <r-field label="Link">
      <r-input-link />
    </r-field>
    <r-field label="Text">
      <r-input-text />
    </r-field>
    <r-field label="String">
      <r-input-string />
    </r-field>
    <r-field label="Money">
      <r-input-money />
    </r-field>
    <r-field label="Integer">
      <r-input-int />
    </r-field>
    <r-field label="Float">
      <r-input-float />
    </r-field>
    <r-field label="Identifer">
      <r-input-identifier />
    </r-field>
    <r-field label="Time">
      <r-input-time />
    </r-field>
    <r-field label="DateTime">
      <r-input-datetime />
    </r-field>
    <r-field label="Date">
      <r-input-date />
    </r-field>
    <r-field label="Color">
      <r-input-color />
    </r-field>
    <r-field label="Boolean">
      <r-input-bool />
    </r-field>

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
import rField from './Fields/rField'
import rInputBool from './Fields/rInputBool'
import rInputColor from './Fields/rInputColor'
import rInputDate from './Fields/rInputDate'
import rInputDatetime from './Fields/rInputDatetime'
import rInputTime from './Fields/rInputTime'
import rInputIdentifier from './Fields/rInputIdentifier'
import rInputFloat from './Fields/rInputFloat'
import rInputInt from './Fields/rInputInt'
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
    rInputMoney,
    rInputString,
    rInputText,
    rInputLink
  },
  data: () => ({
    idInput: '93651',
    typeInput: 'Договор',
    stateInput: 'Подписан',
    nameInput: 'Договор аренды',
    documentText: 'some text',
    amountInput: 312300.0,
    currencyInput: 'Рубль',
    createDateInput: '14.05.2020 21:50'
  })
}
</script>
