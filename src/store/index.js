import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import MainLayout from './MainLayout/MainLayout'
import Type from './Type'
import TypeMetadata from './main/TypeMetadata'
import Record from './components/Record'
import Find from './components/Find'

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
      Type,
      TypeMetadata,
      Record,
      Find
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
