<template>
  <div class="row q-my-md">
    <div class="col-3 text-h6" style="display: flex;align-items: center;">
      Amount
    </div>
    <div class="col-9">
      <q-field
        outlined
        :prefix="prefix"
        dense
        v-bind="$attrs"
      >
        <template v-slot:control>
          <input
            class="q-field__input text-right"
            autofocus
            v-money="moneyFormat"/>
        </template>
      </q-field>
    </div>
  </div>
</template>

<script>
  import { VMoney } from 'v-money'

  export default {
    data: () => ({
      moneyFormat: {
        decimal: '.',
        thousands: ',',
        prefix: '',
        suffix: '',
        precision: 4,
        masked: false
      }
    }),
    props: [
      'prefix',
    ],
    directives: {
      money: VMoney
    }
  }
</script>
