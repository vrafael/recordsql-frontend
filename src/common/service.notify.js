import { Notify } from 'quasar'

export default function showNotify ({ errorMessage, errorCode, displayTimeMS }) {
  try {
    let notifyType

    if (errorCode >= 100 && errorCode <= 105) {
      notifyType = 'information'
    } else if (errorCode >= 200 && errorCode <= 226) {
      notifyType = 'notification'
    } else if (errorCode >= 400 && errorCode <= 499) {
      notifyType = 'clientError'
    } else if (errorCode >= 500 && errorCode <= 510) {
      notifyType = 'serverError'
    } else {
      notifyType = 'defaultError'
    }

    Notify.create({
      type: notifyType,
      message: `${errorMessage}`,
      timeout: displayTimeMS
    })
  } catch (e) {
    throw new Error(`Can not create notify: ${e}`)
  }
}
