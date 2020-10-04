import storage from "store";
import { login, getCurrentUserNav } from "@/api/login";
import { JWT, MENUS } from "@/store/mutation-types";

const user = {
    namespaced: true,
    state: {
        jwt: "",
        hasLogin: false, // 表示没有获取过权限，获取完毕后，把状态改成true
        menus: storage.get("menus") || [], // 存放菜单数据
    },

    mutations: {
        SET_JWT: (state, jwt) => {
            state.jwt = jwt;
            state.hasLogin = true;
            storage.set("hasLogin", state.hasLogin); // 存储登录过权限
        },
        SET_MENUS: (state, menus) => {
            state.menus = menus;
        },
    },

    actions: {
        // 登录
        Login({ commit }, params) {
            return new Promise((resolve, reject) => {
                login(params)
                    .then((response) => {
                        const result = response.data;
                        storage.set(JWT, result.jwt, 7 * 24 * 60 * 60 * 1000);
                        commit("SET_JWT", result.jwt);

                        resolve(result.jwt);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },

        // 获取用户信息
        GetMenu({ commit }, params) {
            return new Promise((resolve, reject) => {
                getCurrentUserNav(params)
                    .then((response) => {
                        console.log(response.data);
                        storage.set(MENUS, response.data);
                        commit("SET_MENUS", response.data);
                        resolve(response.data);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
    },
};

export default user;
