<template>
  <q-field
    v-model="value"
    class="q-field--with-bottom"
    outlined
    dense
    clearable
  >
    <template
      #control
      class="items-center"
    >
      <r-object
        v-if="value"
        :object="value"
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
              context-menu
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
</template>

<script>
import rObject from '../../rObject'

export default {
  components: {
    rObject
  },
  data: () => ({
    value: {
      ID: 1,
      TypeIcon: 'las la-birthday-cake',
      TypeName: 'Cake',
      StateName: 'Приготовлен',
      Name: 'Наполеон'
    },
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
  })
}
</script>
