<template>
  <div class="row q-my-md">
    <div class="col-3 text-h6" style="display: flex;align-items: center;">
      Create date
    </div>
    <div class="col-9">
      <q-input
        v-model="getFormattedCurrentDateAndTime"
        mask="##/##/#### ##:##"
        class="text-body1"
        outlined
      >
        <q-icon
          name="event"
          class="cursor-pointer q-my-auto q-mx-xs"
          size="md"
        >
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date mask="YYYY-MM-DD HH:mm"/>
          </q-popup-proxy>
        </q-icon>

        <q-icon
          name="access_time"
          class="cursor-pointer q-my-auto q-mx-xs"
          size="md"
        >
          <q-popup-proxy
            transition-show="scale"
            transition-hide="scale">
            <q-time
              mask="YYYY-MM-DD HH:mm"
              format24h/>
          </q-popup-proxy>
        </q-icon>
      </q-input>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      createDateInput: ''
    }),
    computed: {
      getFormattedCurrentDateAndTime() {
        const D = new Date();
        const dates = {
          date: D.getDate(),
          month: '' + (D.getMonth() + 1),
          fullYear: D.getFullYear(),
          hours24format: D.getHours(),
          minutes: D.getMinutes(),
        }
        const formattedDates = {}
        for (const [key, value] of Object.entries(dates)) {
          if (value.length <= 1) {
            formattedDates[key] = `0${value}`
          } else if (value === 0) {
            formattedDates[key] = `0${value}`
          }
          else {
            formattedDates[key] = value
          }
        }
        return (
        `${formattedDates.date}.`+
        `${formattedDates.month}.` +
        `${formattedDates.fullYear}` +
        `${formattedDates.hours24format}.` +
        `${formattedDates.minutes}`
        )
      },
    },
  }
</script>
