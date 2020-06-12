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
      <q-list>
        <q-tabs
          vertical
        >

          <q-route-tab
            :to="link.link"
            exact
            v-for="link in Links"
            :key="link.title"
            v-bind="link"
            icon=""
          >
            <q-item
              style="display:flex; align-items: center"
            >
              <q-icon
              :name="link.icon"
              size="sm"
              style="margin-right: 5px; "
              >
              </q-icon>
              {{ link.title }}
            </q-item>
          </q-route-tab>

        </q-tabs>
      </q-list>
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

export default {
  components: {
  },

  data: () => ({
    drawerLeft: false,
    drawerRight: false,
    Links: [
      {
        title: 'Home',
        icon: 'home',
        link: '/'
      },
      {
        title: 'Types',
        icon: 'mdi-puzzle',
        link: '/types'
      },
      {
        title: 'Records',
        icon: 'mdi-database ',
        link: '/records'
      }
    ]
  })
}
</script>
