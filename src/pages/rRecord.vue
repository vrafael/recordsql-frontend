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

            <template
              v-if="!!RECORD_GET
                && !!TYPE_METADATA_GET
                && Object.keys(this.RECORD_GET).length !== 0
                && !!TYPE_METADATA_HAS_OBJECT_PROPERTY
                && this.RECORD_GET.ID === Number(this.$route.params.identifier)"
            >
              <q-btn-dropdown
                v-model="transitions"
                label="Transitions"
                color="accent"
                :loading="RECORD_TRANSITION_LOADING_GET"
              >
                <q-list>
                  <q-item
                    v-for="transition in RECORD_TRANSITION_LIST_GET"
                    :key="transition.id"
                    @click="transitionPush(transition)"
                    clickable
                    v-close-popup
                  >
                    <q-item-section>
                      <q-item-label>{{ transition.TransitionName }}</q-item-label>
                    </q-item-section>
                    <q-tooltip
                      anchor="bottom middle"
                      self="center middle"
                    >
                      {{ transition.Description }}
                    </q-tooltip>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </template>
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
    identifier: {
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
      currentTypeTag: null,
      currentIdentifier: null,
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
      'RECORD_STATE_UPDATE_FIELD',
      'TRANSITION_LIST_FETCH',
      'TRANSITION_PUSH'
    ]),
    changeCurrentTabComponent (tabComponent) {
      this.currentTabComponent = tabComponent
    },
    refresh () {
      if (this.currentTypeTag !== this.typeTag || this.currentIdentifier !== this.identifier) {
        this.currentTypeTag = this.typeTag
        this.currentIdentifier = this.identifier

        if (this.identifier) {
          this.TYPE_METADATA_FETCH({ TypeTag: this.typeTag, Identifier: this.identifier })
          this.RECORD_FETCH({ TypeTag: this.typeTag, Identifier: this.identifier })
        } else {
          this.TYPE_METADATA_FETCH_WITH_RECORD_INIT({ TypeTag: this.typeTag })
        }
      }
    },
    transitionPush (transition) {
      this.TRANSITION_PUSH({
        TypeTag: this.typeTag,
        ID: this.identifier,
        TransitionID: transition.TransitionID,
        TransitionName: transition.TransitionName
      })
    }
  },
  watch: {
    typeTag: async function () {
      await this.refresh()
    },
    identifier: async function () {
      await this.refresh()
    }
  },
  computed: {
    ...mapGetters([
      'TYPE_METADATA_GET',
      'RECORD_GET',
      'RECORD_LOADING_GET',
      'TYPE_METADATA_HAS_OBJECT_PROPERTY',
      'RECORD_TRANSITION_LIST_GET',
      'RECORD_TRANSITION_LOADING_GET'
    ])
  },
  mounted () {
    this.refresh()
  }
}
</script>
