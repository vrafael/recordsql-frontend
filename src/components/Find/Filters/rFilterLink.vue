<template>
  <r-filter
    label="Link"
    :enable.sync="enable"
  >
    <q-field
      class="col-9 q-field--with-bottom"
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
        <r-object
          v-for="item in value"
          :key="item.ID"
          :object="item"
          :remove="removeItem"
          style="max-width: 150px;"
        />
      </template>
      <template #append>
        <q-icon
          name="search"
          class="cursor-pointer"
        >
          <q-popup-proxy>
            <q-list>
              <q-item
                v-for="type in types"
                :key="type.TypeID"
                clickable
                v-close-popup
              >
                <div
                  class="row items-center"
                  style="width:200px"
                >
                  <q-icon
                    :name="type.TypeIcon"
                    color="accent"
                    size="28px"
                    class="q-mr-sm"
                  />
                  <div class="text-weight-bold text-primary">
                    {{ `${type.TypeName}...` }}
                  </div>
                </div>
              </q-item>
            </q-list>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-field>
  </r-filter>
</template>

<script>
import rFilter from './rFilter'
import rObject from '../../rObject'

export default {
  components: {
    rFilter,
    rObject
  },
  data: () => ({
    enable: false,
    value: [{
      ID: 1,
      TypeIcon: 'las la-birthday-cake',
      TypeName: 'Cake',
      StateName: 'Приготовлен',
      Name: 'Наполеон'
    }, {
      ID: 2,
      TypeIcon: 'las la-hippo',
      TypeName: 'Гиппопотам',
      Name: 'Big Hippo'
    }, {
      ID: 96,
      TypeID: 46,
      TypeName: 'Рыбка',
      TypeIcon: 'las la-fish',
      StateName: 'Накормлена',
      StateColor: 'green',
      Name: 'Ponio'
    }],
    types: [{
      TypeID: 10,
      TypeName: 'Рыбка',
      TypeIcon: 'las la-fish',
      TypeTag: 'Fish',
      TypeOwnerID: 1
    }, {
      TypeID: 11,
      TypeName: 'Гиппопотам',
      TypeIcon: 'las la-hippo',
      TypeTag: 'Hippo',
      TypeOwnerID: 1
    }]
  }),
  methods: {
    removeItem (item) {
      const index = this.value.indexOf(item)
      if (index !== -1) {
        this.value.splice(index, 1)
      }
    }
  }
}
</script>
