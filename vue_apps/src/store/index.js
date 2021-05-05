import Vue from "vue";
import Vuex from "vuex";
import ui from "./modules/ui";
import map from "./modules/map";



Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ui: ui,
    map: map
  }
});
