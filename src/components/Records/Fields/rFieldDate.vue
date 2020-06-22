<template>
  <div class="row q-my-md">
    <div class="col-3 text-h6" style="display: flex;align-items: center;">
      Create date
    </div>
    <div class="col-9">

      <q-input
        v-model="creatingDate"
        mask="####/##/##"
        class="text-body1"
        outlined>
          <q-icon
            size="md"
            name="event"
            class="cursor-pointer q-my-auto q-mx-xs">
            <q-popup-proxy
              transition-show="scale"
              transition-hide="scale">
              <q-date
                v-model="creatingDate"
              />
            </q-popup-proxy>
          </q-icon>
      </q-input>

    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      creatingDate: '',
    }),
    mounted() {
      const fd = this.getFormattedCurrentDate();
      this.creatingDate = `${fd.fullYear} ${fd.month} ${fd.date}`
    },
    methods: {
      getFormattedCurrentDate() {
        const D = new Date();
        const dates = {
          date: '' + D.getDate(),
          month: '' + (D.getMonth() + 1),
          fullYear: '' + D.getFullYear(),
        }
        const formattedDates = {}
        for (const [key, value] of Object.entries(dates)) {
          if (value.length <= 1) {
            formattedDates[key] = `0${value}`
          } else if (value === 0) {
            formattedDates[key] = `0${value}`
          } else {
            formattedDates[key] = value
          }
        }
        return {
          date: formattedDates.date,
          month: formattedDates.month,
          fullYear: formattedDates.fullYear
        }
      },
    },
  }
</script>
