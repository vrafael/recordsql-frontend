<template>
  <div>
    <q-slide-transition>
      <div v-show="filters">
        <r-fields />
      </div>
    </q-slide-transition>
    <q-btn style="width:100%" icon="more_horiz" size="xs" @click="filters =! filters"/>
  </div>
</template>

<script>
import rFields from '../Records/rFields';

export default {
  components: {
    rFields,
  },
  data () {
    return ({
      filters: false
    })
  }
}
</script>