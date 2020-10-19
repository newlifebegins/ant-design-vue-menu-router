import { BasicLayout } from "@/layouts/";
const RouteView = {
  name: "RouteView",
  render: h => h("router-view")
};
// 前端路由表
export default {
  home: BasicLayout,
  "working-condition": RouteView,
  "common-sys": RouteView,
  enterprise: () => import("@/views/test/enterprise"),
  "customer-management": () => import("@/views/test/customerManagement"),
  "ent-analyis": () => import("@/views/test/entAnalyis"),
  events: () => import("@/views/test/events"),
  "enterprise-details": () => import("@/views/test/enterpriseDetail")
};
