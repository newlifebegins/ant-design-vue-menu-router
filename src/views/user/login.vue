<template>
    <div>
        <a-button type="primary" @click="handleLogin">
            登录
        </a-button>
    </div>
</template>

<script>
import notification from "ant-design-vue/es/notification";
import { mapActions } from "vuex";
import storage from "store";
export default {
    beforeCreate() {},
    created() {
        // this.handleLogin();
    },
    methods: {
        ...mapActions("user", ["Login", "GetMenu"]),
        async handleLogin() {
            let token = "bearer " + storage.get("access_token");
            const { Login, GetMenu } = this;
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
    },
};
</script>

<style lang="less"></style>
