import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import MainLayout from './MainLayout'
import Types from './Types'
import TypeList from 'src/store/components/Types/TypeList'
import TypeMetadata from 'src/store/main/TypeMetadata'
import Record from 'src/store/components/Record/Record'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      MainLayout,
      Types,
      TypeList,
      TypeMetadata,
      Record
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
