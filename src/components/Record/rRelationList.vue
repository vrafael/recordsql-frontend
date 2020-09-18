<template>
  <div>
    <q-tabs
      v-model="tab"
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="left"
      narrow-indicator
      outside-arrows
      no-caps
    >
      <q-tab
        v-for="relation in TYPE_METADATA_RELATION_LIST_GET"
        :key="relation.RelationID"
        :label="relation.RelationName"
        :icon="relation.TypeIcon"
        :name="`${relation.TypeTag}.${relation.FieldLinkTag}`"
      />
    </q-tabs>
    <q-tab-panels
      v-if="RECORD_ORIGIN_GET && RECORD_ORIGIN_GET._object"
      v-model="tab"
      animated
      swipeable
      transition-prev="jump-right"
      transition-next="jump-left"
    >
      <q-tab-panel
        v-for="relation in TYPE_METADATA_RELATION_LIST_GET"
        :key="relation.RelationID"
        :name="`${relation.TypeTag}.${relation.FieldLinkTag}`"
      >
        <r-find
          :type-tag="relation.TypeTag"
          :filters="{[relation.FieldLinkTag]: {Value: [RECORD_ORIGIN_GET._object], Enable:true}}"
        />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import rFind from 'src/components/Find/rFind'

export default {
  components: {
    rFind
  },
  data () {
    return ({
      tab: null,
      splitter: 30
    })
  },
  computed: {
    ...mapGetters(['TYPE_METADATA_RELATION_LIST_GET', 'RECORD_ORIGIN_GET'])
  }
}
</script>
