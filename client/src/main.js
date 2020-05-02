import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as VeeValidate from "vee-validate";
import vuetify from "./plugins/vuetify";
import i18n from "@/plugins/i18n";

import VueTour from "vue-tour";
require("vue-tour/dist/vue-tour.css");
Vue.use(VueTour);

Vue.use(VeeValidate);

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
