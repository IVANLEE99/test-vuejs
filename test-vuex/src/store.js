import Vue from 'vue'
import Vuex from 'vuex'
import { state, mutations } from './mutation'
// import plugins from './plugin'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  // plugins
})