<template>
  <div class="row q-my-md">
    <div class="col-3 text-h6" style="display: flex;align-items: center;">
      Pick the color
    </div>
    <div class="col-9">
      <q-input
        mask="\#NNNNNN"
        v-model="color.backgroundColor"
        :rules="[ val => val.length === 7 || 'Please use 6 characters']"
        class="my-input"
      >
        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-card>
                <q-color v-model="color.backgroundColor"/>
                <div class="row items-center justify-end q-gutter-sm">
                  <q-btn
                    label="OK"
                    color="primary"
                    flat
                    v-close-popup/>
                  <q-btn
                    label="Cancel"
                    color="primary"
                    flat
                    v-close-popup/>
                </div>
              </q-card>

            </q-popup-proxy>
          </q-icon>
        </template>

        <template v-slot:prepend>
          <div :style="color" class="color-helper"/>
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      color: {
        backgroundColor: '#000000',
        width: '20px',
        height: '20px',
      },
    }),
  }
</script>
