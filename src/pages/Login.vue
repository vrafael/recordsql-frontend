<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <login-form />
    </q-page-container>
  </q-layout>
</template>

<script>
import LoginForm from 'src/components/Login/LoginForm'

export default {
  components: {
    LoginForm
  }
}
</script>
