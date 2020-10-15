<template>
  <router-link
    :to="{ name: 'record', params: { typeTag: value.TypeTag, identifier: value.Identifier }}"
    v-slot="{ href, navigate }"
  >
    <q-card
      :key="value.Identifier"
      class="row q-mr-sm items-center no-wrap"
      flat
      bordered
      dense
    >
      <q-avatar
        class="cursor-pointer"
        color="grey-4"
        text-color="accent"
        font-size="20px"
        :icon="value.TypeIcon"
        style="height: 100%; width: 25px"
        @click="navigate"
      />
      <a
        style="text-decoration: none"
        :href="href"
        class="ellipsis text-primary text-bold q-mx-xs cursor-pointer"
        @click="navigate"
      >
        {{ value.Identifier }}
      </a>
      <q-tooltip content-class="bg-secondary">
        <div class="col q-gutter-xs text-caption">
          <div class="row">
            Type
            <span class="text-bold q-ml-xs">{{ value.TypeName }}</span>
          </div>
        </div>
      </q-tooltip>
    </q-card>
  </router-link>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  }
}
</script>
