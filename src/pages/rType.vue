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
          v-for="(typeList, index) in [TYPE_LIST_NESTED_GET]"
          :key="typeList.Tag"
          :nodes="typeList[index]"
          label-key="Name"
          children-key="children"
          node-key="Tag"
          :expanded.sync="expanded"
          selectable
          :selected.sync="selected"
          selected-color="primary"
        >
          <template #default-header="prop">
            <router-link
              :to="{ name: 'type', params: { typeTag: prop.node.Tag }}"
              v-slot="{ navigate }"
            >
              <div
                class="row items-center no-wrap"
                @click="navigate"
              >
                <q-icon
                  :name="prop.node.Icon"
                  color="accent"
                  size="28px"
                  class="q-mr-sm"
                />
                <div class="ellipsis text-weight-bold">
                  {{ prop.node.Name }}
                </div>
              </div>
            </router-link>
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
        <r-find
          v-if="!!typeTag"
          :type-tag="typeTag"
        />
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import rFind from '../components/Find/rFind'

export default {
  components: {
    rFind
  },
  data () {
    return {
      splitter: 25,
      splitterRestore: null,
      expanded: ['Object', 'Directory'],
      selected: this.typeTag
    }
  },
  methods: {
    ...mapActions(['TYPE_LIST_FETCH']),
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
  props: {
    typeTag: {
      type: String,
      required: false,
      default: null
    }
  },
  async mounted () {
    await this.TYPE_LIST_FETCH()
  },
  computed: {
    ...mapGetters(['TYPE_LIST_NESTED_GET'])
  }
}
</script>
