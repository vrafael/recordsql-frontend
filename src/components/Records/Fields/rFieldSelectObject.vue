<template>
  <div class="row q-my-md">
    <div class="col-3 text-h6" style="display: flex;align-items: center;">
      {{ label }}
    </div>
    <div class="col-9">
      <q-input
        lass="text-body1"
        outlined
        readonly
        dense>
        <q-icon
          slot="prepend"
          color="accent"
          size="md"
          :name="inputIcon">
        </q-icon>
        <q-btn-dropdown class="q-my-xs" color="primary" label="Select">
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section avatar class="q-pr-none">
                <q-icon :name="dropdownIcon"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ label | pluralize }} ...</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-input>
    </div>
  </div>
</template>

<script>

  export default {
    props: [
      'label',
      'inputIcon',
      'dropdownIcon'
    ],
  }
</script>
