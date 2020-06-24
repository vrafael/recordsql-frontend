<template>
  <q-page class="flex full-height full-width">
    <q-splitter v-model="splitter" unit="%" class="full-width" :limits="[0, 60]">
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
      <template v-slot:separator>
        <q-btn color="primary" padding="lg xs" size="xs" icon="drag_indicator" @click="typetreeShow" />
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
      splitter: 25,
      splitterRestore: null,
      expanded: [1, 2],
      selected: null
    }
  },
  methods: {
    typetreeShow () {
      if (this.splitter > 0) {
        this.splitterRestore = this.splitter
        this.splitter = 0
      } else if (this.splitterRestore > 0) {
        this.splitter = this.splitterRestore
        this.splitterRestore = 0
      } else {
        this.splitter = 25
      }
    }
  },
  computed: {
    ...mapGetters('Types', {
      typetree: 'TYPETREE_GET'
    })
  }
};
</script>