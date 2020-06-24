<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/404.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-weight-bold">
      Page not found...
    </p>
    <q-btn
      color="secondary"
      style="width:200px;"
      to="/"
      label="Go back"
    />
  </div>
</template>

<script >
export default {
  name: 'r404'
}
</script>
