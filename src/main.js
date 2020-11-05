import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./lib/antd";
import axios from "axios";
Vue.config.productionTip = false;
import bootstrap from "./core/bootstrap";
// import "./permission"; // permission control

let baseUrl =
    process.env.NODE_ENV == "production" ? "/config.json" : "/config.json";
console.log(axios.defaults.baseURL);
axios.get(baseUrl).then((res) => {
    window.url = res.data;
    new Vue({
        router,
        store,
        created: bootstrap,
        render: (h) => h(App),
    }).$mount("#app");
});
