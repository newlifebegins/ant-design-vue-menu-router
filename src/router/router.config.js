// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from "@/layouts";

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
    {
        path: "/user",
        component: UserLayout,
        redirect: "/user/login",
        hidden: true,
        children: [
            {
                path: "login",
                name: "login",
                component: () =>
                    import(/* webpackChunkName: "user" */ "@/views/user/login"),
            },
        ],
    },
    // {
    //     path: "/",
    //     name: "home",
    //     component: BasicLayout,
    // },

    {
        path: "/404",
        component: () =>
            import(/* webpackChunkName: "fail" */ "@/views/exception/404"),
    },
];
