<template>
  <q-page padding>
    <div class="full-width">
      <q-card>
        <q-card-section class="bg-linear text-white q-pa-sm">
          <div class="row items-center">
            <div class="items-start q-mx-sm">
              <q-skeleton
                v-if="loading"
                type="QAvatar"
              />
              <q-avatar
                v-else
                :icon="record._record ? record._record.TypeIcon : this.type.metadata.Icon"
                font-size="30px"
                color="grey-4"
                text-color="accent"
                size="lg"
                rounded
              />
            </div>
            <div class="col">
              <template v-if="loading">
                <q-skeleton type="text" />
                <q-skeleton type="text" />
              </template>
              <template v-else>
                <div class="text-h6">
                  {{ record ? (record.Name ? record.Name : (recordOrigin._record ? `ID=${recordOrigin._record.Identifier}` : null )) : null }}
                </div>
                <div class="text-caption">
                  {{ recordOrigin._record ? recordOrigin._record.TypeName : this.type.metadata.Name }}
                </div>
              </template>
            </div>

            <template v-if="transitionsShow">
              <q-btn-dropdown
                label="Transitions"
                color="accent"
                :loading="loading"
              >
                <q-list>
                  <q-item
                    v-for="transition in recordOrigin._transitions"
                    :key="transition.TransitionID"
                    @click="transitionPush(transition)"
                    clickable
                    v-close-popup
                    class="q-pa-sm text-bold "
                    :style="(transition.Color ? `border-radius: 3px; color: ${contrastColor(transition.Color)}; background-color: #${transition.Color}` : '')"
                  >
                    <q-item-section>
                      <q-item-label>
                        {{ transition.TransitionName }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-icon
                        name="info"
                        color="primary"
                      />
                      <q-tooltip
                        anchor="bottom middle"
                        self="center middle"
                        content-class="bg-secondary"
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
            v-model="currentTab"
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
            />
            <q-tab
              exact
              name="relations"
              label="Relations"
            />
          </q-tabs>
          <q-separator />
          <q-tab-panels
            v-model="currentTab"
            animated
          >
            <q-tab-panel name="fields">
              <r-field-list
                v-if="!!record && !!metadataInputs"
                :record="record"
                :record-origin="recordOrigin"
                :metadata-inputs="metadataInputs"
                :record-save="recordSave"
                :record-delete="recordDelete"
                :record-reset="recordReset"
                :record-change="recordChange"
              />
            </q-tab-panel>
            <q-tab-panel name="relations">
              <r-relation-list />
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
        <q-inner-loading :showing="loading">
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
import rFieldList from 'components/Record/rFieldList'
import rRelationList from 'components/Record/rRelationList'
import { Notify, colors } from 'quasar'
import fetchApiRPC from 'src/common/service.api.rpc'
import fieldsMapping from 'src/common/fieldsMapping'
import { isEqual } from 'lodash'

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
      currentTab: 'fields',
      record: null,
      recordOrigin: null,
      loading: true,
      type: {
        typeTag: null,
        metadata: null,
        loading: true
      }
    }
  },
  computed: {
    transitionsShow () {
      return !!this.record &&
        !!this.type.metadata &&
        Object.keys(this.record).length !== 0 &&
        !!this.type.metadata.Object
    },
    metadataInputs () {
      return this.type.metadata && this.type.metadata.Fields ? this.type.metadata.Fields.filter(field => field.componentInput && field.componentInput.component) : null
    }
  },
  methods: {
    async refresh () {
      if (this.currentTypeTag !== this.typeTag || this.currentIdentifier !== this.identifier) {
        this.currentTypeTag = this.typeTag
        this.currentIdentifier = this.identifier

        if (this.identifier) {
          await this.metadataGet()
          await this.recordGet()
        } else {
          await this.metadataGet(true)
        }
      }
    },
    async transitionPush (transition) {
      await fetchApiRPC('Dev.ObjectTransitionPush', { ID: this.currentIdentifier, TransitionID: transition.TransitionID })
        .then(() => {
          this.recordGet()
          Notify.create({ type: 'positive', message: `Переход "${transition.TransitionName}" выполнен успешно.` })
        })
        .catch(err => Notify.create({ type: err.type, message: err.message, timeout: err.timeout }))
    },
    contrastColor (color) {
      if (color && colors.brightness(`#${color}`) > 128) {
        return 'black'
      }
      return 'white'
    },
    async metadataGet (recordInit = false) {
      this.type.loading = true
      if (recordInit) {
        this.loading = true
      }
      await fetchApiRPC('Dev.TypeMetadata', { TypeTag: this.currentTypeTag })
        .then(response => {
          const typeMetadata = response[0]
          typeMetadata.Fields.map(fieldsMapping)
          this.type = {
            metadata: typeMetadata,
            typeTag: this.currentTypeTag,
            loading: false
          }
          if (recordInit) {
            const emptyRecord = {}
            typeMetadata.Fields.forEach((field) => {
              emptyRecord[field.Tag] = this.$route.query[field.Tag] ? JSON.parse(this.$route.query[field.Tag]) : null
            })
            this.loading = false
            this.record = JSON.parse(JSON.stringify(emptyRecord))
            this.recordOrigin = JSON.parse(JSON.stringify(emptyRecord))
          }
        }).catch(err => {
          this.type = {
            metadata: null,
            typeTag: null,
            loading: false
          }
          if (recordInit) {
            this.record = null
            this.loading = false
          }
          Notify.create({ type: err.type, message: err.message, timeout: err.timeout })
        })
    },
    async recordGet () {
      this.loading = true
      await fetchApiRPC('Dev.RecordGet', { TypeTag: this.currentTypeTag, Identifier: this.currentIdentifier })
        .then(response => {
          if (response && response.length > 0) {
            this.record = JSON.parse(JSON.stringify(response[0]))
            this.recordOrigin = JSON.parse(JSON.stringify(response[0]))
            this.loading = false
          } else {
            Notify.create({ type: 'negative', message: 'Запись не найдена!' })
            this.$router.push('/404')
          }
        }).catch(err => Notify.create({ type: err.type, message: err.message, timeout: err.timeout }))
    },
    async recordSave () {
      const set = {}

      this.metadataInputs.forEach(input => {
        if (input.componentInput) {
          if (input.componentInput.format) {
            set[input.Tag] = input.componentInput.format(this.record[input.Tag])
          } else {
            set[input.Tag] = this.record[input.Tag]
          }
        }
      })

      const params = { TypeTag: this.currentTypeTag, Set: set }
      this.loading = true

      await fetchApiRPC('Dev.RecordSet', params)
        .then(response => {
          if (response && response.length > 0) {
            if (!this.recordOrigin || !isEqual(response[0]._record, this.recordOrigin._record)) {
              this.$router.replace({ name: 'record', params: { typeTag: response[0]._record.TypeTag, identifier: response[0]._record.Identifier } })
            }
            this.record = JSON.parse(JSON.stringify(response[0]))
            this.recordOrigin = JSON.parse(JSON.stringify(response[0]))
          } else {
            Notify.create({ type: 'negative', message: 'Не удалось сохранить запись!' })
          }
          this.loading = false
        }).catch(err => {
          this.loading = false
          Notify.create({ type: err.type, message: err.message, timeout: err.timeout })
        })
    },
    async recordDelete () {
      await fetchApiRPC('Dev.RecordDel', { TypeTag: this.currentTypeTag, Identifier: this.currentIdentifier })
        .then(() => {
          Notify.create({ type: 'positive', message: 'Запись удалена!' })
          this.$router.push({ name: 'home' })
        })
    },
    recordReset () {
      this.record = JSON.parse(JSON.stringify(this.recordOrigin))
    },
    recordChange (change) {
      for (const fieldItem in change) {
        this.record[fieldItem] = change[fieldItem]
      }
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
