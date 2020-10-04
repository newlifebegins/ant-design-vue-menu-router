import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./core/antd";

Vue.config.productionTip = false;
import bootstrap from "./core/bootstrap";
// import "./permission"; // permission control

new Vue({
    router,
    store,
    created: bootstrap,
    render: (h) => h(App),
}).$mount("#app");
