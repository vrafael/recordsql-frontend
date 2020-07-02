<template>
  <div class="row q-my-md">
    <div
      class="col-3 text-h6"
      style="display: flex;align-items: center;"
    >
      {{ name }}
    </div>
    <div class="col-9">
      <!--      <q-input class="text-body1" v-model="defaultValue" outlined readonly>-->
      <!--        <q-btn-dropdown class="q-my-xs" color="primary" label="Select">-->
      <!--          <q-list>-->
      <!--            <q-item clickable v-close-popup>-->
      <!--              <q-item-section style="display:flex; flex-flow: row; align-items: center">-->
      <!--                <q-icon :name="icon" size="sm"></q-icon>-->
      <!--                <q-item-label class="text-subtitle2">{{`${name}s ...`}}</q-item-label>-->
      <!--              </q-item-section>-->
      <!--            </q-item>-->
      <!--          </q-list>-->
      <!--        </q-btn-dropdown>-->
      <!--      </q-input>-->
      <q-select
        v-model="modelMultiple"
        multiple
        :options="options"
        use-chips
        stack-label
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    icon: String,
    defaultValue: String
  },
  data: () => ({
    modelMultiple: ['2rsoft'],
    options: [
      'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
    ]
  })
}
</script>
