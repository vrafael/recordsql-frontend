<template>
  <div class="row q-my-md q-pb-md">
    <div
      class="col-3"
      @click="enable = !enable"
    >
      <q-toggle v-model="enable" />
      Link
    </div>
    <div class="col-9">
      <q-field
        v-model="value"
        :disable="!enable"
        outlined
        dense
        clearable
      >
        <template
          #control
          class="items-center"
        >
          <q-card
            v-for="item in value"
            :key="item.ID"
            class="q-mr-sm items-center row"
            flat
            bordered
          >
            <q-avatar
              color="grey-4"
              text-color="accent"
              font-size="20px"
              :icon="item.TypeIcon"
              style="width: 25px"
            />
            <div
              class="ellipsis q-pl-xs text-primary text-bold"
              style="max-width: 100px;"
            >
              {{ item.Name }}
              <q-tooltip content-class="bg-primary">
                {{ item.Name }}
              </q-tooltip>
            </div>
            <q-btn
              size="xs"
              flat
              dense
              round
              icon="close"
            />
          </q-card>
        </template>
      </q-field>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    enable: false,
    value: [{
      ID: 1,
      TypeIcon: 'las la-birthday-cake',
      Name: 'Cake'
    }, {
      ID: 2,
      TypeIcon: 'las la-hippo',
      Name: 'Big hippopotamus'
    }, {
      ID: 96,
      TypeID: 46,
      TypeName: 'Состояние',
      TypeIcon: 'las la-fish',
      StateName: 'Сформирован',
      StateColor: '008000',
      Name: 'Fish'
    }]
  }),
  methods: {
    removeItem (item) {
      console.log(item)
    }
  }
}
</script>
