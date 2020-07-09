<template>
  <q-page
    padding
    class="flex full-width"
  >
    <q-splitter
      v-model="splitter"
      unit="%"
      class="full-width"
      :limits="[0, 60]"
    >
      <template #before>
        <q-banner class="bg-linear text-white">
          <span class="text-h6">Types</span>
        </q-banner>
        <q-tree
          v-for="(typeList, index) in [nestedTypeLists]"
          :key="typeList.id"
          :nodes="typeList[index]"
          label-key="Name"
          children-key="children"
          node-key="ID"
          :selected.sync="selected"
          :expanded.sync="expanded"
          selectable
          selected-color="primary"
        >
          <template #default-header="prop">
            <div class="row items-center">
              <q-icon
                :name="prop.node.Icon"
                color="accent"
                size="28px"
                class="q-mr-sm"
              />
              <div class="text-weight-bold text-primary">
                {{ prop.node.Name }}
              </div>
            </div>
          </template>
        </q-tree>
      </template>
      <template #separator>
        <q-btn
          color="primary"
          padding="lg xs"
          size="xs"
          icon="drag_indicator"
          @click="typetreeShow"
        />
      </template>
      <template #after>
        <r-find />
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import rFind from '../components/Find/rFind'

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
  async mounted () {
    await this.$store.dispatch('Types/TYPE_LIST_FETCH')
  },
  computed: {
    ...mapGetters('Types', {
      typetree: 'TYPETREE_GET',
      nestedTypeLists: 'TYPE_LIST_NESTED_GET'
    })
  }
}
</script>
