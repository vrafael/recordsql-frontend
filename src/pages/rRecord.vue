<template>
  <q-page padding>
    <div class="full-width">
      <q-card>
        <q-card-section class="bg-linear text-white">
          <div class="row items-center">
            <div class="items-start q-mx-sm">
              <q-skeleton
                v-if="RECORD_LOADING_GET"
                type="QAvatar"
              />
              <q-icon
                v-else
                :name="RECORD_GET && RECORD_GET.Type ? RECORD_GET.Type.Icon : this.TYPE_METADATA_GET.Icon"
                style="font-size:3em;"
              />
            </div>
            <div class="col">
              <template v-if="RECORD_LOADING_GET">
                <q-skeleton type="text" />
                <q-skeleton type="text" />
              </template>
              <template v-else>
                <div class="text-h6">
                  {{ RECORD_GET && RECORD_GET.hasOwnProperty('Name') ? RECORD_GET.Name : '' }}
                </div>
                <div class="text-subtitle2">
                  {{ RECORD_GET && RECORD_GET.Type ? RECORD_GET.Type.Name : this.TYPE_METADATA_GET.Name }}
                </div>
              </template>
            </div>

            <q-fab
              v-model="transitions"
              v-if="!RECORD_LOADING_GET"
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
              @click="changeCurrentTabComponent('rFieldList')"
            />
            <q-tab
              exact
              name="relations"
              label="Relations"
              @click="changeCurrentTabComponent('rRelationList')"
            />
          </q-tabs>
          <q-separator />
          <component :is="currentTabComponent" />
        </q-card-section>
        <q-inner-loading :showing="RECORD_LOADING_GET">
          <q-spinner-gears
            size="50px"
            color="primary"
          />
        </q-inner-loading>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import rFieldList from 'components/Record/rFieldList'
import rRelationList from 'components/Record/rRelationList'

export default {
  components: {
    rFieldList,
    rRelationList
  },
  props: {
    id: {
      type: Number,
      required: false,
      default: null
    },
    typeTag: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      tab: 'fields',
      transitions: false,
      currentTabComponent: 'rFieldList'
    }
  },
  methods: {
    ...mapActions([
      'TYPE_METADATA_FETCH',
      'TYPE_METADATA_FETCH_WITH_RECORD_INIT',
      'RECORD_FETCH',
      'RECORD_STATE_UPDATE_FIELD'
    ]),
    changeCurrentTabComponent (tabComponent) {
      this.currentTabComponent = tabComponent
    },
    refresh () {
      if (this.id) {
        this.TYPE_METADATA_FETCH({ TypeTag: this.typeTag })
        this.RECORD_FETCH({ TypeTag: this.typeTag, ID: this.id })
      } else {
        this.TYPE_METADATA_FETCH_WITH_RECORD_INIT({ TypeTag: this.typeTag })
      }
    }
  },
  watch: {
    typeTag: async function () {
      await this.refresh()
    },
    id: async function () {
      await this.refresh()
    }
  },
  computed: {
    ...mapGetters(['TYPE_METADATA_GET', 'RECORD_GET', 'RECORD_LOADING_GET'])
  },
  mounted () {
    this.refresh()
  }
}
</script>
