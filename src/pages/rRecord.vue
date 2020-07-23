<template>
  <q-page padding>
    <div class="full-width">
      <q-card>
        <q-card-section class="bg-linear text-white">
          <div class="row items-center">
            <div class="items-start q-mx-sm">
              <q-icon
                :name="RECORD_GET && RECORD_GET.Type ? RECORD_GET.Type.Icon : ''"
                style="font-size:3em;"
              />
            </div>
            <div class="col">
              <div class="text-h6">
                {{ RECORD_GET && RECORD_GET.hasOwnProperty('Name') ? RECORD_GET.Name : '' }}
              </div>
              <div class="text-subtitle2">
                {{ RECORD_GET && RECORD_GET.Type ? RECORD_GET.Type.Name : '' }}
              </div>
            </div>

            <q-fab
              v-model="transitions"
              v-show="RECORD_GET"
              label="Transitions"
              vertical-actions-align="left"
              color="accent"
              icon="keyboard_arrow_down"
              direction="down"
              label-position="left"
            >
              <q-fab-action
                color="primary"
                icon="thumb_up"
                label="Согласовать"
              />
              <q-fab-action
                color="secondary"
                icon="thumb_down"
                label="Отклонить"
              />
            </q-fab>
          </div>
        </q-card-section>
        <q-card-section>
          <q-tabs
            v-model="tab"
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="left"
            narrow-indicator
          >
            <q-tab
              exact
              name="fields"
              label="Fields"
              @click="changeCurrentTabComponent('rFields')"
            />
            <q-tab
              exact
              name="relations"
              label="Relations"
              @click="changeCurrentTabComponent('rRelations')"
            />
          </q-tabs>
          <q-separator />
          <component :is="currentTabComponent"/>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import rFields from '../components/Record/rFields'
import rRelations from '../components/Record/rRelations'

export default {
  props: {
    id: {
      type: Number,
      required: false,
      default: null
    }
  },
  components: {
    rFields,
    rRelations
  },
  data () {
    return {
      tab: 'fields',
      transitions: false,
      currentTabComponent: 'rFields'
    }
  },
  methods: {
    ...mapActions(['TYPE_METADATA_FETCH', 'RECORD_FETCH']),
    changeCurrentTabComponent (tabComponent) {
      this.$data.currentTabComponent = tabComponent
    }
  },
  computed: {
    ...mapGetters(['TYPE_METADATA_GET', 'RECORD_GET'])
  },
  async mounted () {
    await this.TYPE_METADATA_FETCH({ ID: this.id })
    if (this.id) {
      await this.RECORD_FETCH({ ID: this.id })
    }
  }
}
</script>
