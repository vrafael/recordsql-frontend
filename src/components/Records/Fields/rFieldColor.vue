<template>
  <div class="row q-my-md">
    <div class="col-3 text-h6" style="display: flex;align-items: center;">
      Pick the color
    </div>
    <div class="col-9">
      <q-input
        mask="\#NNNNNN"
        v-model="inputColor"
        :rules="[ val => val.length === 7 || 'Please use 6 characters']"
        class="my-input"
      >
        <q-icon
          @click="applyColorToPicker"
          slot="append"
          name="colorize"
          class="cursor-pointer">
          <q-popup-proxy
            transition-show="scale"
            transition-hide="scale">
            <q-card>
              <q-color v-model="pickerColor"/>
              <div class="row items-center justify-end">
                <q-btn
                  @click="applyColorToInput"
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
        <div slot="prepend" :style="helperColor.style" class="color-helper"/>
      </q-input>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      inputColor: '',
      helperColor: {
        style: {
          backgroundColor: '',
          width: '20px',
          height: '20px',
        }
      },
      pickerColor: '',
    }),
    watch: {
      inputColor: function (val) {
        if (val.length === 4 || val.length === 7) {
          this.helperColor.style.backgroundColor = val;
        }
      },
    },
    mounted() {
      this.helperColor.style.backgroundColor = this.inputColor;
    },
    methods: {
      applyColorToInput() {
        this.inputColor = this.pickerColor
      },
      applyColorToPicker() {
        this.pickerColor = this.inputColor
      },

    }
  }
</script>
