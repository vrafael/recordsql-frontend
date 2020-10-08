<template>
  <router-link
    :to="{ name: 'record', params: { typeTag: value.TypeTag, identifier: value.ID }}"
    v-slot="{ href, navigate }"
  >
    <q-card
      :key="value.ID"
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
        :href="href"
        style="text-decoration: none"
        class="ellipsis text-primary text-bold q-mx-xs cursor-pointer"
        @click="navigate"
      >
        {{ value.Name }}
      </a>
      <q-tooltip content-class="bg-secondary">
        <div class="col q-gutter-xs text-caption">
          <div class="row">
            Type
            <span class="text-bold q-ml-xs">{{ value.TypeName }}</span>
          </div>
          <div class="row">
            Name
            <span class="text-bold q-ml-xs">{{ value.Name }}</span>
          </div>
          <div class="row">
            State
            <div
              class="q-mx-xs text-bold "
              :style="(value.StateColor ? `border-radius: 3px; color: ${contrastColor(value.StateColor)}; background-color: #${value.StateColor}` : '')"
            >
              <span class="q-mx-xs">
                {{ value.StateName ? value.StateName : 'NULL' }}
              </span>
            </div>
          </div>
        </div>
      </q-tooltip>
      <!--q-badge
        v-if="value.StateName"
        :color="value.StateColor"
        class="q-mx-sm"
        style="border-radius: 5px"
      >
        {{ value.StateName ? value.StateName.charAt(0) : '' }}
      </q-badge-->
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
  </router-link>
</template>

<script>
import { colors } from 'quasar'

export default {
  props: {
    value: {
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
        this.remove(this.value)
      }
    },
    contrastColor (color) {
      if (color && colors.brightness(`#${color}`) > 128) {
        return 'black'
      }
      return 'white'
    }
  }
}
</script>
