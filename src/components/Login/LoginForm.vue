<template>
  <q-page class="flex flex-center bg-linear flex">
    <div>
      <div
        class="flex flex-center q-mb-md unselectable"
      >
        <img
          src="img/RecordLogo.svg"
          style="max-width: 100px; max-height: 100px"
        >
        <div class="text-h5 text-center text-white q-ml-md">
          Welcome to <br> RecordSQL!
        </div>
      </div>

      <q-card>
        <q-card-section>
          <q-form class="q-pa-sm">
            <div>
              <q-input
                bg-color="white"
                class="q-my-sm"
                v-model="email"
                mask="email"
                type="email"
                label="Enter your email"
                label-slot
                clearable
                outlined
                :rules="emailInputRules"
              >
                <template #prepend>
                  <q-icon
                    name="email"
                  >
                  </q-icon>
                </template>
              </q-input>
            </div>

            <div>
              <q-input
                bg-color="white"
                class="q-my-sm"
                v-model="password"
                :type="isPwd ? 'password' : 'text'"
                label="Enter your password"
                clearable
                outlined
                :rules="passwordInputRules"
              >
                <template #prepend>
                  <q-icon
                    name="mdi-onepassword"
                  >
                  </q-icon>
                </template>
                <template #append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
          </q-form>
        </q-card-section>
        <q-card-actions>
          <q-btn
            class="full-width q-px-sm"
            color="green"
          >
            Sign in
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      password: '',
      email: '',
      isPwd: false,
      emailInputRules: [
        val => (!val) || (
          /([a-zA-Z\d]+@[a-zA-Z\d]+\.[a-z]{2,})$/
            .test(val)
        ) || 'Use email format',
        val => (val && val.length > 0) || 'Email is required'
      ],
      passwordInputRules: [
        val => (val && val.length > 0) || 'Password is required'
      ]
    }
  }
}
</script>

<style lang="scss">
  .bg-linear {
    background: linear-gradient(90deg,  $secondary 5%, $primary 50%, $secondary  95%)
  }
  .unselectable {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none;   /* Chrome/Safari/Opera */
    -moz-user-select: none;      /* Firefox */
    -ms-user-select: none;       /* Internet Explorer/Edge */
    user-select: none;           /* Non-prefixed version, currently
                                  not supported by any browser */
  }
</style>
