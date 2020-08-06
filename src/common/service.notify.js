import { Notify } from 'quasar'

export default function showNotify ({ message, code = 200, displayTimeMS = 5000 }) {
  try {
    let notifyType

    if (code >= 100 && code <= 105) {
      notifyType = 'information'
    } else if (code >= 200 && code <= 226) {
      notifyType = 'notification'
    } else if (code >= 400 && code <= 499) {
      notifyType = 'clientError'
    } else if (code >= 500 && code <= 510) {
      notifyType = 'serverError'
    } else {
      notifyType = 'defaultError'
    }

    Notify.create({
      type: notifyType,
      message: `${message}`,
      timeout: displayTimeMS
    })
  } catch (e) {
    throw new Error(`Can not create notify: ${e}`)
  }
}
