<template>
  <div class="row q-my-md">
    <div class="col-3 text-h6" style="display: flex;align-items: center;">
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
</template>