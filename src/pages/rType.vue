<template>
  <q-page
    padding
    class="flex full-width"
  >
    <q-splitter
      v-model="splitter"
      unit="%"
      class="full-width"
      :limits="[0, 60]"
    >
      <template #before>
        <div v-if="!!typeListNestedGet">
          <q-tree
            :nodes="typeListNestedGet"
            label-key="Name"
            children-key="children"
            node-key="Tag"
            :expanded.sync="expanded"
            selectable
            :selected.sync="selected"
            selected-color="primary"
          >
            <template #default-header="prop">
              <router-link
                v-if="prop.node.type === 'type'"
                :to="{ name: 'type', params: { typeTag: prop.node.Tag }}"
                v-slot="{ navigate }"
              >
                <div
                  class="row items-center no-wrap"
                  @click="navigate"
                >
                  <q-icon
                    :name="prop.node.Icon"
                    :color="prop.node.Abstract ? 'grey' : 'accent'"
                    size="20px"
                    class="q-mr-sm"
                  />
                  <div
                    style="text-size: 10px"
                    :class="'ellipsis' + (prop.node.Fields && prop.node.Fields.length > 0 ? ' text-weight-bold' : '')"
                  >
                    {{ prop.node.Name }}
                  </div>
                  <q-popup-proxy context-menu>
                    <q-card bordered>
                      <q-card-section>
                        <r-object :value="prop.node._object" />
                        <div class="q-pt-sm">
                          Tag<span class="text-bold text-primary q-ml-xs">{{ prop.node.Tag }}</span>
                        </div>
                        <div v-if="!!prop.node.Description">
                          {{ prop.node.Description }}
                        </div>
                      </q-card-section>
                      <template v-if="prop.node.Fields && prop.node.Fields.length > 0">
                        <q-separator inset />
                        <q-card-section>
                          <q-list>
                            <q-item
                              v-for="field in prop.node.Fields"
                              :key="field.ID"
                              dense
                              class="items-center"
                            >
                              <div
                                class=" row items-center no-wrap"
                                style="width: 200px"
                              >
                                <span class="q-pr-xs">{{ field.Order }}.</span>
                                <r-object :value="field._object" />
                              </div>
                              <span
                                class="q-pl-xs text-primary"
                                style="width: 100px"
                              >{{ field.Column }}
                                <q-tooltip
                                  v-if="!!field.Description"
                                  anchor="bottom left"
                                  self="center left"
                                  content-class="bg-secondary text-weight-bold"
                                >
                                  {{ field.Description }}
                                </q-tooltip>
                              </span>
                            </q-item>
                          </q-list>
                        </q-card-section>
                      </template>
                      <q-separator inset />
                      <q-card-actions>
                        <q-btn
                          color="primary"
                          flat
                          :to="{name: 'record', params: {typeTag: prop.node._object.TypeTag }, query: {Owner: JSON.stringify(prop.node._object)}}"
                        >
                          <q-icon
                            left
                            name="add"
                          />Create subtype
                        </q-btn>
                      </q-card-actions>
                    </q-card>
                  </q-popup-proxy>
                </div>
              </router-link>
              <!--div
                v-else-if="prop.node.type === 'folder'"
                class="row items-center no-wrap"
              >
                <q-icon
                  name="folder"
                  color="grey"
                  size="20px"
                  class="q-mr-sm"
                />
                <div class="ellipsis">
                  {{ prop.node.Name }}
                </div>
              </div>
              <div
                v-else-if="prop.node.type === 'field'"
                class="row items-center no-wrap"
              -->
              <!--q-icon
                  :name="prop.node._object.TypeIcon"
                  color="accent"
                  size="18px"
                  class="q-mr-sm"
                />
                <div class="ellipsis">
                  {{ prop.node._object.Name }}
                </div-->
              <!--r-object :value="prop.node._object" /-->
              <!--/div-->
            </template>
          </q-tree>
        </div>
      </template>
      <template #separator>
        <q-btn
          color="primary"
          padding="lg xs"
          size="xs"
          icon="drag_indicator"
          @click="typetreeShow"
        />
      </template>
      <template #after>
        <r-find
          v-if="!!typeTag"
          :type-tag="typeTag"
        />
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
import fetchApiRPC from 'src/common/service.api.rpc'
import rFind from '../components/Find/rFind'
import rObject from '../components/rObject'

export default {
  components: {
    rFind,
    rObject
  },
  props: {
    typeTag: {
      type: String,
      required: false,
      default: null
    }
  },
  data () {
    return {
      splitter: 25,
      splitterRestore: null,
      expanded: ['Object', 'Directory'],
      selected: this.typeTag,
      typeList: [],
      loading: false
    }
  },
  computed: {
    typeListNestedGet () {
      const typesParser = (ownerID, fields) => {
        return this.typeList
          .filter(type => type.OwnerID === ownerID)
          .map(type => ({
            ...type,
            type: 'type',
            children: typesParser(type.ID)
          }))
      }
      const res = typesParser(null, [])
      return res
    }
  },
  methods: {
    async typeListFetch () {
      await fetchApiRPC('Dev.TypeList')
        .then(response => {
          response.map(item => {
            item.OwnerID = Object.prototype.hasOwnProperty.call(item, 'OwnerID') ? item.OwnerID : null
          })
          this.typeList = response
        })
    },
    typetreeShow () {
      if (this.splitter > 0) {
        this.splitterRestore = this.splitter
        this.splitter = 0
      } else if (this.splitterRestore > 0) {
        this.splitter = this.splitterRestore
        this.splitterRestore = 0
      } else {
        this.splitter = 25
      }
    }
  },
  async mounted () {
    await this.typeListFetch()
  }
}
</script>
