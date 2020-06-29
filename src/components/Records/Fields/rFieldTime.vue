<template>
  <div class="row q-my-md">
    <div class="col-3 text-h6" style="display: flex;align-items: center;">
      Create time
    </div>
    <div class="col-9">
      <q-input
        dense
        v-model="creatingTime"
        mask="##:##:##.###"
        class="text-body1"
        outlined>
        <q-icon
          size="md"
          name="access_time"
          class="cursor-pointer q-my-auto q-mx-xs">
          <q-popup-proxy
            transition-show="scale"
            transition-hide="scale">
            <q-time
              mask="HH:mm:ss.00"
              v-model="creatingTime"
              format24h>
              <div class="row items-center justify-end q-gutter-sm">
                <q-btn
                  label="OK"
                  color="primary"
                  flat
                  v-close-popup />
                <q-btn
                  label="Cancel"
                  color="primary"
                  flat
                  v-close-popup />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </q-input>

    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      creatingTime: '',
    }),
    mounted() {
      const fd = this.getFormattedCurrentDateAndTime();
      this.creatingTime = `${fd.hours24format}:${fd.minutes}:${fd.seconds}.${fd.milliseconds}`;
    },
    methods: {
      getFormattedCurrentDateAndTime() {
        const D = new Date();
        const dates = {
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
          hours24format: formattedDates.hours24format,
          minutes: formattedDates.minutes,
          seconds: formattedDates.seconds,
          milliseconds: formattedDates.milliseconds,
        }
      },
    },
  }
</script>
