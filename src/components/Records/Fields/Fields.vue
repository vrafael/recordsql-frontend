<template>
  <q-page padding class="flex justify-center">
    <div class="row full-width" style="max-width: 1000px">
      <div class="col-12 q-mx-auto">
        <q-card class="q-mx-xs">

          <q-card-section>
            <Header/>
            <Tabs/>
          </q-card-section>

          <q-card-section>
            <q-form
              class="q-pa-md"
            >

              <div class="row q-my-md">
                <div class="col-3 text-h6"
                     style="display: flex;align-items: center;"
                >
                  ID
                </div>
                <div class="col-9">
                  <q-input
                    class="text-body1"
                    v-model="idInput"
                    outlined
                    readonly
                  ></q-input>
                </div>
              </div>

              <div class="row q-my-md">
                <div class="col-3 text-h6"
                     style="display: flex;align-items: center;"
                >
                  Type
                </div>
                <div class="col-9">
                  <q-input
                    class="text-body1"
                    v-model="typeInput"
                    outlined
                    readonly
                  >
                    <q-btn-dropdown
                      class="q-my-xs"
                      color="primary"
                      label="Select"
                    >
                      <q-list>
                        <q-item clickable v-close-popup>
                          <q-item-section>
                            <q-item-label>Types ...</q-item-label>
                          </q-item-section>
                        </q-item>

                      </q-list>
                    </q-btn-dropdown>
                  </q-input>
                </div>
              </div>

              <div class="row q-my-md">
                <div class="col-3 text-h6"
                     style="display: flex;align-items: center;"
                >
                  State
                </div>
                <div class="col-9">
                  <q-input
                    class="text-body1"
                    v-model="stateInput"
                    outlined
                    readonly
                  >
                    <q-btn-dropdown
                      class="q-my-xs"
                      color="primary"
                      label="Select"
                    >
                      <q-list>
                        <q-item clickable v-close-popup>
                          <q-item-section>
                            <q-item-label>State ...</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-btn-dropdown>
                  </q-input>
                </div>
              </div>

              <div class="row q-my-md">
                <div class="col-3 text-h6"
                     style="display: flex;align-items: center;"
                >
                  Name
                </div>
                <div class="col-9">
                  <q-input
                    class="text-body1"
                    v-model="nameInput"
                    outlined
                    clearable
                  ></q-input>
                </div>
              </div>

              <div class="row q-my-md">
                <div class="col-3 text-h6"
                     style="display: flex;align-items: center;"
                >
                  Document text
                </div>
                <div class="col-9">
                  <q-input
                    type="textarea"
                    class="text-body1"
                    v-model="documentText"
                    outlined
                  ></q-input>
                </div>
              </div>

              <div class="row q-my-md">
                <div class="col-3 text-h6"
                     style="display: flex;align-items: center;"
                >
                  Amount
                </div>
                <div class="col-9">
                  <q-input
                    class="text-body1"
                    v-model="amountInput"
                    outlined
                    clearable
                  ></q-input>
                </div>
              </div>

              <div class="row q-my-md">
                <div class="col-3 text-h6"
                     style="display: flex;align-items: center;"
                >
                  Currency
                </div>
                <div class="col-9">
                  <q-input
                    class="text-body1"
                    v-model="currencyInput"
                    outlined
                    readonly
                  >
                    <q-btn-dropdown
                      class="q-my-xs"
                      color="primary"
                      label="Select"
                    >
                      <q-list>
                        <q-item clickable v-close-popup>
                          <q-item-section>
                            <q-item-label>Currency ...</q-item-label>
                          </q-item-section>
                        </q-item>

                      </q-list>
                    </q-btn-dropdown>
                  </q-input>
                </div>
              </div>

              <div class="row q-my-md">
                <div class="col-3 text-h6"
                     style="display: flex;align-items: center;"
                >
                  Create date
                </div>
                <div class="col-9">
                  <q-input
                    mask="datetime"
                    class="text-body1"
                    v-model="createDateInput"
                    outlined
                  ></q-input>
                </div>
              </div>

            </q-form>
          </q-card-section>

          <q-card-actions
          >
            <div class="col-2">
              <q-btn
                label="Save changes"
                type="submit"
                color="teal"
              ></q-btn>
            </div>
            <div class="col-2">
              <q-btn
                label="Cancel"
              ></q-btn>
            </div>
            <div class="col-2 offset-6">
              <q-btn
                class="q-ml-auto"
                label="Delete"
              ></q-btn>
            </div>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
  import Tabs from 'components/Records/Tabs'
  import Header from 'components/Records/Header'

  export default {
    components: {
      Tabs,
      Header,
    },
    data: () => ({
      idInput: '93651',
      typeInput: 'Договор',
      stateInput: 'Подписан',
      nameInput: 'Договор аренды',
      documentText: 'some text',
      amountInput: 312300.00,
      currencyInput: 'Рубль',
      createDateInput: '14.05.2020 21:50',
    }),
  }
</script>

<style scoped>

</style>
