<template>
  <div class="row q-my-md">
    <div
      class="col-3 text-h6"
      style="display: flex;align-items: center;"
    >
      Float
    </div>
    <div class="col-9">
      <q-field
        outlined
        dense
        v-bind="$attrs"
      >
        <template #control>
          <input
            v-model="float"
            class="q-field__input text-right"
            autofocus
            type="number"
          >
        </template>
      </q-field>
    </div>
  </div>
</template>

<script>
import { VMoney } from 'v-money'

export default {
  data: () => ({
    float: '',
    moneyFormat: {
      decimal: '',
      thousands: '',
      prefix: '',
      suffix: '',
      precision: '',
      masked: false
    }
  }),
  props: [
    'prefix'
  ],
  directives: {
    money: VMoney
  }
}
</script>
