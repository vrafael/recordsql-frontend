<template>
  <div
    class="records__header q-pa-md"
  >
    <div class="row">
      <div class="col-auto">
        <q-icon
          name="mdi-cash-usd-outline"
          size="md"
        >
        </q-icon>
      </div>
      <div class="col-auto">
        <span
          class="text-h4"
          style="margin-left: 10px"
        >Заявка на ПК</span>
      </div>
      <q-btn-dropdown
        color="grey-6"
        label="Transitions"
        class="q-ml-auto"
      >
        <q-list>
          <q-item clickable v-close-popup>
            <q-item-section>
              <q-item-label>Согласовать</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup>
            <q-item-section>
              <q-item-label>Отклонить</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup>
            <q-item-section>
              <q-item-label>Отозвать</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-separator style="margin-top: 5px"/>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
</style>
