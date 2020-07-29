<template>
  <q-card
    :key="object.ID"
    class="row q-mr-sm items-center no-wrap"
    flat
    bordered
    dense
  >
    <q-avatar
      color="grey-4"
      text-color="accent"
      font-size="20px"
      :icon="object.TypeIcon"
      style="height: 100%; width: 25px"
    />
    <span class="ellipsis text-primary text-bold q-mx-xs">
      {{ object.Name }}
    </span>
    <q-tooltip>
      <div class="col q-gutter-xs text-caption">
        <div class="row">
          {{ object.TypeName }}
          <span class="text-bold q-ml-xs">{{ object.Name }}</span>
        </div>
        <q-badge
          v-if="object.StateName"
          :color="object.StateColor"
        >
          {{ object.StateName }}
        </q-badge>
      </div>
    </q-tooltip>
    <q-badge
      v-if="object.StateName"
      :color="object.StateColor"
      class="q-mx-sm"
      style="border-radius: 5px"
    >
      {{ object.StateName ? object.StateName.charAt(0) : '' }}
    </q-badge>
    <q-btn
      v-if="remove"
      size="xs"
      flat
      dense
      round
      icon="close"
      @click="removeClick"
    />
  </q-card>
</template>

<script>
export default {
  props: {
    object: {
      type: Object,
      required: true
    },
    remove: {
      type: Function,
      required: false,
      default: null
    }
  },
  methods: {
    removeClick () {
      if (this.remove) {
        this.remove(this.object)
      }
    }
  }
}
</script>>
