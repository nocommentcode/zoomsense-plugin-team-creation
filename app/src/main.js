import Vue from "vue";
import App from "./App.vue";
console.log("hi there 1");
Vue.config.productionTip = false;
console.log("hi there 2");

import { rtdbPlugin } from "vuefire";
Vue.use(rtdbPlugin);
console.log("hi there 3");

new Vue({
  render: (h) => h(App),
}).$mount("#app");
console.log("hi there 4");
