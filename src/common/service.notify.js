import { Notify } from 'quasar'

export default function showNotify ({ message, notifyType = 'defaultError', displayTimeMS = 5000 }) {
  try {
    /**
     * Type's of error:
     * 'information'
     * 'notification'
     * 'clientError'
     * 'serverError'
     * 'defaultError'
     */
    Notify.create({
      type: notifyType,
      message: `${message}`,
      timeout: displayTimeMS
    })
  } catch (e) {
    throw new Error(`Can not create notify: ${e}`)
  }
}
