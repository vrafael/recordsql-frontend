<template>
  <q-layout view="hHh Lpr fff">
    <q-header
      elevated
      class="bg-linear"
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawerLeft = !drawerLeft"
        />
        <q-toolbar-title>
          <q-avatar rounded>
            <img
              src="~assets/RecordLogo.svg"
              style="max-width: 32px; max-height: 32px"
            >
          </q-avatar>
          RecordSQL
        </q-toolbar-title>
        <q-btn
          flat
          @click="drawerRight = !drawerRight"
          round
          dense
          icon="star"
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
        <q-list
          v-for="(menu_item, index) in menu"
          :key="index"
        >
          <q-item
            :to="menu_item.link"
            :exact="menu_item.link === '/'"
            clickable
            class="menu"
            active-class="menu-active bg-blue-1"
          >
            <q-item-section avatar>
              <q-icon
                :name="menu_item.icon"
                :color="menu_item.iconColor"
              />
            </q-item-section>
            <q-item-section>
              {{ menu_item.label }}
            </q-item-section>
          </q-item>

          <q-separator v-if="menu_item.separator" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-drawer
      side="right"
      v-model="drawerRight"
      bordered
      content-class="bg-grey-1"
    >
      <q-list class="flex flex-center">
        Favorite objects
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
  data () {
    return ({
      drawerLeft: true,
      drawerRight: false
    })
  },
  computed: {
    ...mapGetters('MainLayout', {
      menu: 'MENU_GET'
    })
  }
}
</script>

<style lang="sass">
.bg-linear
  background: linear-gradient(90deg,  $secondary 5%, $primary 50%, $secondary  95%)

.menu
  color: $primary
  &-active
    color: $accent
</style>
