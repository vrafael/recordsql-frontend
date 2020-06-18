<template>
  <div class="row q-my-md">
    <div class="col-3 text-h6" style="display: flex;align-items: center;">
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
</template>

<script>
export default {
  data() {
    return {
      createDateInput: "14.05.2020 21:50"
    }
  }
}
</script>