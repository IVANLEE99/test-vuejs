import Vue from 'vue'
import Vuex from 'vuex'
// import { state, mutations } from './mutation'
import { state, mutations,getters } from './my_mutation'
// my_mutation
// import plugins from './plugin'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  getters
  // plugins
})