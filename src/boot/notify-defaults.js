import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'top',
  timeout: 5000,
  actions: [{ icon: 'close', color: 'white' }]
})

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
// export default async (/* { app, router, Vue ... } */) => {
// something to do
// }
