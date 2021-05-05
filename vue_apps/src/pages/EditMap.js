import Vue from "vue";
import EditApp from "../EditApp.vue";
import store from "../store";
window.store = store

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(EditApp)
}).$mount("#edit_app");
