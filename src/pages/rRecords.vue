<template>
  <q-page padding class="flex justify-center">
    <div class="row full-width" style="max-width: 1000px">
      <div class="col-12">
        <q-card>
          <q-card-section class="bg-linear text-white">
            <div class="row items-center ">
              <div class="items-start q-mx-sm">
                <q-icon name="las la-laptop" style="font-size: 3em;" />
              </div>
              <div class="col">
                <div class="text-h6">Заявка на ПК от 31.03.2020</div>
                <div class="text-subtitle2">Обеспечение офиса</div>
              </div>

              <q-fab
                v-model="transitions"
                label="Transitions"
                vertical-actions-align="left"
                color="accent"
                icon="keyboard_arrow_down"
                direction="down"
                label-position="left"
              >
                <q-fab-action color="primary" @click="onClick" icon="thumb_up" label="Согласовать" />
                <q-fab-action color="secondary" @click="onClick" icon="thumb_down" label="Отклонить" />
              </q-fab>
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
      tab: 'fields',
      transitions: false
    };
  }
};
</script>