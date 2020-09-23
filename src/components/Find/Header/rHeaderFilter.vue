<template>
  <div
    class="row"
    style="max-width: 300px"
  >
    <div class="col-12">
      <div
        class="row items-center no-wrap q-my-sm flex justify-between"
      >
        <div>
          <q-icon
            :name="field.Type.Icon"
            color="accent"
            size="20px"
            class="q-mr-sm"
          />
          <span class="ellipsis">
            {{ field.Name }}
          </span>
        </div>

        <div
          v-if="this.field.Type.Tag === 'FieldString'"
        >
          <q-icon
            name="info"
            color="primary"
            size="sm"
          />
          <q-tooltip
            anchor="bottom middle"
            self="center middle"
            content-class="bg-secondary"
            content-style="padding: 0; margin: 0"
          >
            <q-table
              style="max-width: 700px !important;"
              table-class="bg-secondary text-white"
              class="full-width"
              :data="data"
              :columns="columns"
              row-key="name"
              hide-header
              hide-bottom
              dense
            />
          </q-tooltip>
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    field: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      columns: [
        { name: 'name', required: true, align: 'left', field: 'name', style: 'width: 30px !important; font-size: 12px;' },
        { name: 'description', align: 'left', field: 'description', style: 'width: 50px !important; font-size: 12px;' }
      ],
      data: [
        {
          name: '%',
          description: 'Любая строка, содержащая ноль или более символов.'
        },
        {
          name: '_',
          description: 'Любой одиночный символ.'
        },
        {
          name: '[ ]',
          description: 'Любой одиночный символ, содержащийся в диапазоне ([a-f]) или наборе ([abcdef]).'
        },
        {
          name: '[^]',
          description: 'Любой одиночный символ, не содержащийся в диапазоне ([^a-f]) или наборе ([^abcdef]).'
        }
      ]
    }
  }
}
</script>
