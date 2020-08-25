import { Notify } from 'quasar'

Notify.registerType('defaultError', {
  icon: 'error',
  progress: true,
  color: 'red',
  textColor: 'white',
  classes: 'glossy',
  position: 'top'
})

// 100-105
Notify.registerType('information', {
  icon: 'info',
  progress: true,
  color: 'info',
  textColor: 'white',
  classes: 'glossy',
  position: 'top'
})

// 200-226
Notify.registerType('notification', {
  icon: 'notifications',
  progress: true,
  color: 'warning',
  textColor: 'white',
  classes: 'glossy',
  position: 'top'
})

// 400-499
Notify.registerType('clientError', {
  icon: 'error',
  progress: true,
  color: 'red',
  textColor: 'white',
  classes: 'glossy',
  position: 'top'
})

// 500-510
Notify.registerType('serverError', {
  icon: 'error',
  progress: true,
  color: 'red',
  textColor: 'white',
  classes: 'glossy',
  position: 'top'
})
