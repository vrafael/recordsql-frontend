<template>
  <q-page>
    <q-splitter v-model="splitter">
      <template v-slot:before>
        <q-tree
          :nodes="types"
          :selected.sync="selected"
          :expanded.sync="expanded"
          node-key="id"
        >
          <template v-slot:default-header="prop">
            <div class="row items-center">
              <q-icon
                :name="prop.node.icon || 'share'"
                color="orange"
                size="28px"
                class="q-mr-sm"
              />
              <div class="text-weight-bold text-primary">
                {{ prop.node.label }}
              </div>
            </div>
          </template>
        </q-tree>
      </template>
      <template v-slot:after>
        <div class="flex justify-center">
          Coming soon..
        </div>
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      splitter: 50,
      expanded: [1, 2],
      types: [
        {
          id: 1,
          label: 'Object',
          icon: 'las la-atom',
          children: [
            {
              id: 2,
              label: 'Directory',
              icon: 'las la-book',
              children: [
                {
                  id: 3,
                  label: 'Field',
                  icon: 'las la-tag'
                },
                {
                  id: 4,
                  label: 'Type',
                  icon: 'las la-cog'
                }
              ]
            },
            {
              id: 5,
              label: 'Error',
              icon: 'las la-exclamation-circle',
              children: [
                {
                  id: 6,
                  label: 'SystemError',
                  icon: 'las la-exclamation-triangle'
                },
                {
                  id: 7,
                  label: 'SecurityError',
                  icon: 'las la-ban'
                }
              ]
            }
          ]
        }
      ]
    };
  }
};
</script>