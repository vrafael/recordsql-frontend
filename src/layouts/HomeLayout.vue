<template>
  <q-layout view="hHh Lpr fff">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawerLeft = !drawerLeft"
        />
        <img
          src="~assets/RecordSQL-logo.png"
          style="max-width: 32px; max-height: 32px"
        >
        <q-toolbar-title>
          RecordSQL
        </q-toolbar-title>
        <q-btn
          flat
          @click="drawerRight = !drawerRight"
          round
          dense
          icon="menu"
        />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="drawerLeft"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-scroll-area class="fit">
        <q-list v-for="(link, index) in links" :key="index">
          <q-item :to="link.link" exact clickable>
            <q-item-section avatar>
              <q-icon :name="link.icon" :color="link.iconColor" />
            </q-item-section>
            <q-item-section>
              {{ link.label }}
            </q-item-section>
          </q-item>

          <q-separator v-if="link.separator" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-drawer
      side="right"
      v-model="drawerRight"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list class="flex flex-center">
        Buffer
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    drawerLeft: true,
    drawerRight: true,
  }),
  computed: {
    ...mapGetters('HomeLayout', {
      links: 'getAllLinks',
    })
  },
}
</script>
