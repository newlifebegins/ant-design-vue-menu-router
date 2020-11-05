<template></template>

<script>
import notification from "ant-design-vue/es/notification";
import { mapActions } from "vuex";
import storage from "store";
import { getToken } from "@/api/user";
export default {
    beforeCreate() {},
    created() {
        // if (storage.get('access_token')) {
        //     this.handleLogin();
        // }
    },
    mounted() {
        setTimeout(() => {
            this.handleLogin();
        }, 200);
    },
    methods: {
        ...mapActions("user", ["Login", "GetMenu"]),
        async handleLogin() {
            const { Login, GetMenu, getToken } = this;
            let access_token = await getToken();
            let token = "bearer " + access_token;
            let jwt = await Login({ token, sysCode: "bb_process" });
            if (jwt) {
                let menuList = await GetMenu({ jwt });
                console.log(menuList);
                if (menuList && menuList.length) {
                    this.$router.push({ path: "/home" });
                } else {
                    notification.error({
                        message: "error",
                        description: "没有获取到菜单列表",
                    });
                }
            }
        },
        async getToken() {
            return new Promise((resolve, reject) => {
                getToken({ code: storage.get("code") })
                    .then((res) => {
                        console.log(res);
                        if (res.data) {
                            let { access_token, audience } = res.data;
                            storage.set("access_token", access_token);
                            storage.set("uid", audience + "");
                            localStorage.setItem("uid", audience);
                            resolve(access_token);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
    },
};
</script>

<style lang="less"></style>
