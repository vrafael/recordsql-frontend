<template>
  <q-page padding>
    <div class="full-width">
      <q-card>
        <q-card-section class="bg-linear text-white q-pa-sm">
          <div class="row items-center">
            <div class="items-start q-mx-sm">
              <q-skeleton
                v-if="RECORD_LOADING_GET"
                type="QAvatar"
              />
              <q-avatar
                v-else
                :icon="RECORD_GET && RECORD_GET._record ? RECORD_GET._record.TypeIcon : this.TYPE_METADATA_GET.Icon"
                font-size="30px"
                color="grey-4"
                text-color="accent"
                size="lg"
                rounded
              />
            </div>
            <div class="col">
              <template v-if="RECORD_LOADING_GET">
                <q-skeleton type="text" />
                <q-skeleton type="text" />
              </template>
              <template v-else>
                <div class="text-h6">
                  {{ RECORD_GET ? (RECORD_GET.hasOwnProperty('Name') && RECORD_GET.Name ? RECORD_GET.Name : (RECORD_GET._record ? RECORD_GET._record.Identifier : null )) : null }}
                </div>
                <div class="text-caption">
                  {{ RECORD_GET && RECORD_GET._record? RECORD_GET._record.TypeName : this.TYPE_METADATA_GET.Name }}
                </div>
              </template>
            </div>

            <template v-if="transitionsShow">
              <q-btn-dropdown
                v-model="transitionsDropdown"
                label="Transitions"
                color="accent"
                :loading="RECORD_LOADING_GET"
              >
                <q-list>
                  <q-item
                    v-for="transition in RECORD_TRANSITION_LIST_GET"
                    :key="transition.TransitionID"
                    @click="transitionPush(transition)"
                    clickable
                    v-close-popup
                    :style="`background-color: ${transition.Color ? '#' + transition.Color : null}; color: ${transition.textColor}`"
                  >
                    <q-item-section>
                      <q-item-label>
                        {{ transition.TransitionName }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-icon
                        style
                        name="info"
                        :color="transition.textColor"
                      />
                      <q-tooltip
                        anchor="bottom middle"
                        self="center middle"
                      >
                        {{ transition.Description }}
                      </q-tooltip>
                    </q-item-section>
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
              name="fields"
              label="Fields"
              @click="changeCurrentTabComponent('rFieldList')"
            />
            <q-tab
              v-if="TYPE_METADATA_GET.Object && RECORD_ORIGIN_GET && RECORD_ORIGIN_GET._record"
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
      transitionsDropdown: false,
      currentTabComponent: 'rFieldList'
    }
  },
  computed: {
    ...mapGetters([
      'TYPE_METADATA_GET',
      'RECORD_GET',
      'RECORD_ORIGIN_GET',
      'RECORD_LOADING_GET',
      'TYPE_METADATA_HAS_OBJECT_PROPERTY',
      'RECORD_TRANSITION_LIST_GET'
    ]),
    transitionsShow () {
      return !!this.RECORD_TRANSITION_LIST_GET
    }
  },
  methods: {
    ...mapActions([
      'TYPE_METADATA_FETCH',
      'TYPE_METADATA_FETCH_WITH_RECORD_INIT',
      'RECORD_FETCH',
      'RECORD_STATE_UPDATE_FIELD',
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
  mounted () {
    this.refresh()
  }
}
</script>
