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
        <q-scroll-area
          v-if="!!types"
          style="height: 100%"
        >
          <q-option-group
            v-model="treeType"
            :options="[{label: 'By Modules', value: 'modules'},
                       {label: 'By Inheritance', value: 'inheritance'}]"
            color="primary"
            inline
          />
          <q-tree
            :nodes="treeType === 'modules' ? typesByModulesGet : typesByInheritanceGet"
            label-key="Name"
            children-key="children"
            node-key="ID"
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
                    :class="'ellipsis' +
                      (prop.node.Fields && prop.node.Fields.length > 0 ? ' text-weight-bold' : '') +
                      (!prop.node._object.StateName ? ' text-italic' : '')"
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
              <div
                v-else-if="prop.node.type === 'module'"
                class="row items-center no-wrap"
              >
                <q-icon
                  name="layers"
                  color="primary"
                  size="20px"
                  class="q-mr-sm"
                />
                <div class="ellipsis">
                  {{ prop.node.Name }}
                </div>
              </div>
            </template>
          </q-tree>
        </q-scroll-area>
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
        <q-scroll-area style="height: 100%">
          <r-find
            v-if="!!typeTag"
            :type-tag="typeTag"
          />
        </q-scroll-area>
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
import fetchApiRPC from 'src/common/service.api.rpc'
import rFind from '../components/Find/rFind'
import rObject from '../components/rObject'

const typesParser = (ownerID, types) => {
  return types
    .filter(type => type.OwnerID === ownerID)
    .map(type => ({
      ...type,
      type: 'type',
      children: typesParser(type.ID, types)
    }))
}

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
      expanded: [1, 2],
      selected: this.typeTag,
      types: null,
      modules: null,
      loading: false,
      treeType: 'modules' // 'inheritance'
    }
  },
  computed: {
    typesByInheritanceGet () {
      const res = typesParser(null, this.types)
      return res
    },
    typesByModulesGet () {
      const modulesParser = (ownerID) => {
        return this.modules
          .filter(mod => mod.OwnerID === ownerID)
          .map(mod => {
            const children = modulesParser(mod.ID)
            const moduleTypes = this.types
              .filter(type => type.ModuleID === mod.ID)
              .map(type => Object.assign({}, type))

            moduleTypes.map(type => {
              let ownerID = type.OwnerID
              if (ownerID && !moduleTypes.find(findType => findType.ID === ownerID)) {
                ownerID = null
              }
              type.OwnerID = ownerID
            })
            const types = typesParser(null, moduleTypes)
            if (moduleTypes.length > 0) {
              children.push(...types)
            }
            return ({
              ...mod,
              type: 'module',
              children
            })
          })
      }
      const res = modulesParser(null)
      return res
    }
  },
  methods: {
    async typesFetch () {
      await fetchApiRPC('Dev.TypeTree')
        .then(response => {
          // response.map(item => {item.OwnerID = Object.prototype.hasOwnProperty.call(item, 'OwnerID') ? item.OwnerID : null})
          this.types = response[0].Types
          this.modules = response[0].Modules
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
    await this.typesFetch()
  }
}
</script>
