<template>
  <div class="row q-my-md">
    <div class="col-3 text-h6" style="display: flex;align-items: center;">
      Create time
    </div>
    <div class="col-9">

      <q-input
        v-model="creatingDate"
        mask="##:##"
        class="text-body1"
        outlined>

        <template>
          <q-icon
            size="md"
            name="access_time"
            class="cursor-pointer q-my-auto q-mx-xs">
            <q-popup-proxy
              transition-show="scale"
              transition-hide="scale">
              <q-time
                v-model="creatingDate"
                mask="HH:mm"
                format24h/>
            </q-popup-proxy>
          </q-icon>
        </template>
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
      this.creatingDate = this.getFormattedCurrentDateAndTime();
    },
    methods: {
      getFormattedCurrentDateAndTime() {
        const D = new Date();
        const dates = {
          hours24format: '' + D.getHours(),
          minutes: '' + D.getMinutes(),
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
        return (
        `${formattedDates.hours24format}.` +
        `${formattedDates.minutes}`
        )
      },
    },
  }
</script>
