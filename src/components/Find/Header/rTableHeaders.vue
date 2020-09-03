<template>
  <q-tr
    :props="props"
  >
    <q-th
      v-for="col in props.cols"
      :key="col.name"
      :props="props"
    >
      {{ col.label }}
      <q-btn-dropdown
        flat
        size="xs"
        color="primary"
      >
        <q-list>
          <q-item
            clickable
            v-close-popup
          >
            <!--            <q-item-section>-->
            <!--              <template v-if="!!type.metadata && !!typeMetadataFilters">-->
            <!--                <component-->
            <!--                  v-for="field in typeMetadataFilters"-->
            <!--                  :is="field.componentFilter.component"-->
            <!--                  :field="field"-->
            <!--                  :key="field.ID"-->
            <!--                  :filter="findFilters[field.Tag]"-->
            <!--                  :filter-current="findFiltersEmpty[field.Tag]"-->
            <!--                  :filter-update="filterUpdate"-->
            <!--                />-->
            <!--              </template>-->
            <!--            </q-item-section>-->
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-th>
  </q-tr>
</template>

<script>
export default {
  props: {
    props: {
      type: Object,
      default: null
    }
  }
}
</script>
