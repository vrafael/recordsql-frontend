import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import Layout from './Layout'
import Type from './Type'
import TypeMetadata from './TypeMetadata'
import Record from './Record'
import Find from './Find'
import Filter from './Filter'

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
      Layout,
      Type,
      TypeMetadata,
      Record,
      Find,
      Filter
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
