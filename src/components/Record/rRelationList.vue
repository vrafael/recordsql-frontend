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
        v-for="relation in relations"
        :key="relation.RelationID"
        :label="relation.RelationName"
        :icon="relation.TypeIcon"
        :name="`${relation.TypeTag}.${relation.FieldLinkTag}`"
      />
    </q-tabs>
    <q-tab-panels
      v-model="tab"
      animated
      swipeable
      transition-prev="jump-right"
      transition-next="jump-left"
    >
      <q-tab-panel
        v-for="relation in relations"
        :key="relation.RelationID"
        :name="`${relation.TypeTag}.${relation.FieldLinkTag}`"
      >
        <r-find
          :type-tag="relation.TypeTag"
          :filters="{[relation.FieldLinkTag]: {Value: [object], isEnabled: true}}"
        />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import rFind from 'src/components/Find/rFind'

export default {
  components: {
    rFind
  },
  props: {
    relations: {
      type: Array,
      required: true
    },
    object: {
      type: Object,
      required: true
    }
  },
  data () {
    return ({
      tab: null,
      splitter: 30
    })
  }
}
</script>
