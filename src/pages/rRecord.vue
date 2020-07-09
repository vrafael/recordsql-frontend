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
            <q-route-tab
              exact
              to="fields"
              name="fields"
              label="Fields"
            />
            <q-route-tab
              exact
              to="relations"
              name="relations"
              label="Relations"
            />
          </q-tabs>
          <q-separator />
          <router-view />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    id: {
      type: Number,
      required: false,
      default: null
    }
  },
  data () {
    return {
      tab: 'fields',
      transitions: false
    }
  },
  methods: {
    ...mapActions(['TYPE_METADATA_FETCH', 'RECORD_FETCH'])
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
