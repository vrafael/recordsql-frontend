<template>
  <q-page class="flex full-height full-width">
    <q-splitter v-model="splitter" unit="px" class="full-width">
      <template v-slot:before>
        <q-tree
          :nodes="typetree"
          node-key="id"
          :selected.sync="selected"
          :expanded.sync="expanded"
          selectable
          selected-color="primary"
        >
          <template v-slot:default-header="prop">
            <div class="row items-center">
              <q-icon
                :name="prop.node.icon"
                color="accent"
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
        <r-find />
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';
import rFind from '../components/Find/rFind';

export default {
  components: {
    rFind
  },
  data () {
    return {
      splitter: 300,
      expanded: [1, 2],
      selected: null,
    };
  },
  computed: {
    ...mapGetters('Types', {
      typetree: 'TYPETREE_GET'
    })
  }
};
</script>