import { Notify } from 'quasar'

Notify.registerType('defaultError', {
  icon: 'mdi-alert-circle',
  progress: true,
  color: 'red',
  textColor: 'white',
  classes: 'glossy',
  position: 'top'
})

// 100-105
Notify.registerType('information', {
  icon: 'mdi-information',
  progress: true,
  color: 'info',
  textColor: 'white',
  classes: 'glossy',
  position: 'top'
})

// 200-226
Notify.registerType('notification', {
  icon: 'mdi-bell',
  progress: true,
  color: 'warning',
  textColor: 'white',
  classes: 'glossy',
  position: 'top'
})

// 400-499
Notify.registerType('clientError', {
  icon: 'mdi-alert-circle',
  progress: true,
  color: 'red',
  textColor: 'white',
  classes: 'glossy',
  position: 'top'
})

// 500-510
Notify.registerType('serverError', {
  icon: 'mdi-alert-circle',
  progress: true,
  color: 'red',
  textColor: 'white',
  classes: 'glossy',
  position: 'top'
})
