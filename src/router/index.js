import Vue from "vue";
import VueRouter from "vue-router";
import storage from "store";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css";
// import store from "@/store";
import { constantRouterMap } from "./router.config";
import { setAsyncRoutes } from "./generator-routers";

Vue.use(VueRouter);

// hack router push callback
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

const createRouter = () =>
    new VueRouter({
        mode: "history",
        // base: process.env.BASE_URL,
        routes: constantRouterMap,
    });
const router = createRouter();
// 路由全局拦截
router.beforeEach((to, from, next) => {
    NProgress.start(); // start progress bar
    console.log(to);
    let hasLogin = storage.get("hasLogin");
    if (hasLogin) {
        console.log(to.meta.require, to.path);
        if (!to.meta.require && to.name !== "login") {
            const menus = storage.get("menus");
            // 重新配置路由
            setAsyncRoutes(menus);
            router.replace(to.path);
        } else next();
        // 已经登录过访问的是login，跳转至home
        // if (to.name === "login") {
        //     next({ path: "/home" });
        // } else {
        //     next();
        // }
    } else {
        // 没有登录想访问其他页面，跳转至
        if (to.name !== "login") {
            next({ path: "/user" });
        } else {
            next();
        }
    }
});
router.afterEach(() => {
    NProgress.done(); // finish progress bar
});

export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;
