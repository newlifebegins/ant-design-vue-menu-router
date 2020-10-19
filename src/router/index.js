import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import storage from "store";
import { constantRouterMap } from "./router.config";
import { setAsyncRoutes } from "./generator-routers";

Vue.use(Router);

// hack router push callback
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

let createRouter = () =>
  new Router({
    // base: process.env.BASE_ENV === 'dev' ? '' : '/',
    mode: "history",
    routes: constantRouterMap
  });
const router = createRouter();
// 路由全局拦截
router.beforeEach((to, from, next) => {
  NProgress.start(); // start progress bar
  console.log(to);
  let hasLogin = storage.get("hasLogin");
  if (hasLogin) {
    console.log(to.meta.require, to.path);
    if (
      !to.meta.require &&
      to.name !== "login" &&
      !to.path.includes("common-sys") &&
      !to.path.includes("events")
    ) {
      const menus = storage.get("menus");
      // 重新配置路由
      setAsyncRoutes(menus);
      let path = to.path == "/" ? "/home" : to.fullPath;
      router.replace(path);
    } else next();
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
