import Vue from 'vue';
import Vuex from 'vuex';
import StatusModule from "./status";
import valueModule from "./value";
import principleModule from "./principle";

Vue.use(Vuex);

export default new Vuex.Store({

  strict: false,
  modules:{
    status: StatusModule,
Valuevue: valueModule,
Principlevue: principleModule,

  },
  state: {
    drawer: true,
    OrdersList: []
  },
  mutations: {
    toggleDrawer(state) {
      state.drawer = !state.drawer;
    }
  },
  actions: {
    TOGGLE_DRAWER({ commit }) {
      commit('toggleDrawer');
    },
  },
  getters: {
    DRAWER_STATE(state) {
      return state.drawer;
    }
  }
});
