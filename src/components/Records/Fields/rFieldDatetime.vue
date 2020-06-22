<template xmlns="http://www.w3.org/1999/html">
  <div class="row q-my-md">
    <div class="col-3 text-h6" style="display: flex;align-items: center;">
      Create date & time
    </div>
    <div class="col-9">
      <div
        class="row"
      >
        <div class="col-6">
          <q-input
            v-model="creatingDate"
            mask="####.##.##"
            class="text-body1"
            outlined>
            <template>
              <q-icon
                size="md"
                name="event"
                class="cursor-pointer q-my-auto q-mx-xs">
                <q-popup-proxy
                  transition-show="scale"
                  transition-hide="scale">
                  <q-date
                    v-model="creatingDate"
                  >
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn label="OK" color="primary" flat @click="save" v-close-popup/>
                      <q-btn label="Cancel" color="primary" flat v-close-popup/>
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-6">
          <q-input
            v-model="creatingTime"
            mask="##:##:##:##"
            class="text-body1 q-ml-md"
            outlined>
            <q-icon
              size="md"
              name="access_time"
              class="cursor-pointer q-my-auto q-mx-xs">
              <q-popup-proxy
                transition-show="scale"
                transition-hide="scale">
                <q-time
                  v-model="creatingTime"
                  format24h>
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn label="Cancel" color="primary" flat v-close-popup/>
                    <q-btn label="OK" color="primary" flat @click="save" v-close-popup/>
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </q-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      creatingDate: '',
      creatingTime: '',
    }),
    mounted() {
      const fd = this.getFormattedCurrentDateAndTime();
      this.creatingDate = `${fd.fullYear}.${fd.month}.${fd.date}`;
      this.creatingTime = `${fd.hours24format}:${fd.minutes}:${fd.seconds}:${fd.milliseconds}`;
    },
    methods: {
      getFormattedCurrentDateAndTime() {
        const D = new Date();
        const dates = {
          date: '' + D.getDate(),
          month: '' + (D.getMonth() + 1),
          fullYear: '' + D.getFullYear(),
          hours24format: '' + D.getHours(),
          minutes: '' + D.getMinutes(),
          seconds: '' + D.getSeconds(),
          milliseconds: '' + D.getMilliseconds()
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
          fullYear: formattedDates.fullYear,
          hours24format: formattedDates.hours24format,
          minutes: formattedDates.minutes,
          seconds: formattedDates.seconds,
          milliseconds: formattedDates.milliseconds,
        }
      },
    },
  }
</script>
