<template>
  <q-form class="q-pa-md">
    <r-field-identity />

    <div class="row q-my-md">
      <div class="col-3 text-h6" style="display: flex;align-items: center;">
        Type
      </div>
      <div class="col-9">
        <q-input class="text-body1" v-model="typeInput" outlined readonly>
          <q-btn-dropdown class="q-my-xs" color="primary" label="Select">
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Types ...</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-input>
      </div>
    </div>

    <div class="row q-my-md">
      <div class="col-3 text-h6" style="display: flex;align-items: center;">
        State
      </div>
      <div class="col-9">
        <q-input class="text-body1" v-model="stateInput" outlined readonly>
          <q-btn-dropdown class="q-my-xs" color="primary" label="Select">
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>State ...</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-input>
      </div>
    </div>

    <r-field-string />

    <r-field-text />

    <div class="row q-my-md">
      <div class="col-3 text-h6" style="display: flex;align-items: center;">
        Currency
      </div>
      <div class="col-9">
        <q-input class="text-body1" v-model="currencyInput" outlined readonly>
          <q-btn-dropdown class="q-my-xs" color="primary" label="Select">
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Currency ...</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-input>
      </div>
    </div>

    <r-field-money />
    <r-field-datetime />

    <div class="row">
      <q-btn style="width: 140px">
        <q-icon left name="save" />
        Save
      </q-btn>
      <q-space />
      <q-btn style="width: 140px">
        <q-icon left name="cancel" />
        Cancel
      </q-btn>
    </div>
  </q-form>
</template>

<script>
import rFieldIdentity from './Fields/rFieldIdentity';
import rFieldString from './Fields/rFieldString';
import rFieldDatetime from './Fields/rFieldDatetime';
import rFieldMoney from './Fields/rFieldMoney';
import rFieldText from './Fields/rFieldText';

export default {
  components: {
    rFieldIdentity,
    rFieldString,
    rFieldDatetime,
    rFieldMoney,
    rFieldText
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
};
</script>

