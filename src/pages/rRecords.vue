<template>
  <q-page padding class="flex justify-center">
    <div class="row full-width" style="max-width: 1000px">
      <div class="col-12 q-mx-auto">
        <q-card class="q-mx-xs">
          <q-card-section>
            <div class="q-pa-md">
              <div class="row">
                <div class="col-auto">
                  <q-icon name="mdi-cash-usd-outline" size="md"> </q-icon>
                </div>
                <div class="col-auto">
                  <span class="text-h4" style="margin-left: 10px"
                    >Заявка на ПК</span
                  >
                </div>
                <q-btn-dropdown
                  color="primary"
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
                <q-separator style="margin-top: 5px" />
              </div>
            </div>
            <div class="row">
              <q-tabs
                v-model="tab"
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="justify"
                narrow-indicator
              >
                <q-route-tab
                  exact
                  to="/records/fields"
                  name="fields"
                  label="Fields"
                />
                <q-route-tab
                  exact
                  to="/records/relations"
                  name="relations"
                  label="Relations"
                />
              </q-tabs>
            </div>
          </q-card-section>
          <router-view />
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      tab: "fields"
    }
  }
}
</script>