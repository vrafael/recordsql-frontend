<template>
  <q-page
    padding
    class="flex justify-center"
  >
    <div
      class="row full-width"
      style="max-width: 1000px"
    >
      <div class="col-12 q-mx-auto">
        <q-card>
          <q-card-section class="bg-primary text-white">
            <div class="row items-center ">
              <div class="items-start q-mx-sm">
                <q-icon
                  name="las la-laptop"
                  style="font-size: 3em;"
                />
              </div>
              <div class="col">
                <div class="text-h6">
                  Заявка на ПК от 31.03.2020
                </div>
                <div class="text-subtitle2">
                  Обеспечение офиса
                </div>
              </div>

              <q-btn-group>
                <q-btn-dropdown
                  class="text-black"
                  color="white"
                  label="Transitions"
                >
                  <q-list>
                    <q-item
                      clickable
                      v-close-popup
                    >
                      <q-item-section>
                        <q-item-label>Согласовать</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item
                      clickable
                      v-close-popup
                    >
                      <q-item-section>
                        <q-item-label>Отклонить</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item
                      clickable
                      v-close-popup
                    >
                      <q-item-section>
                        <q-item-label>Отозвать</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
                <q-btn
                  color="red"
                  icon="delete"
                />
              </q-btn-group>
            </div>
          </q-card-section>
          <q-card-section>
            <q-tabs
              v-model="tab"
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="left"
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
            <q-separator />
            <router-view />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      tab: 'fields'
    }
  }
}
</script>
