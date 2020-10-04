<template>
    <div class="header">
        <div class="logo">企业环保用电监管</div>

        <a-menu
            theme="dark"
            mode="horizontal"
            :selectedKeys="selectedKeys"
            :style="{ lineHeight: '42px' }"
        >
            <a-menu-item v-for="e in headerMenu" :key="e.path">
                <router-link :to="{ name: e.path }">{{ e.label }}</router-link>
            </a-menu-item>
        </a-menu>
        <div class="return" @click="logout">
            <a-icon type="import" />
        </div>
    </div>
</template>

<script>
import storage from "store";
export default {
    props: ["headerMenu"],
    name: "e-header",
    data() {
        return {};
    },
    computed: {
        selectedKeys() {
            let matched = this.$route.matched;
            // console.log(matched);
            try {
                return [matched[1].name];
            } catch (error) {}
        },
    },
    mounted() {},
    destroyed() {},
    methods: {
        logout() {
            storage.clearAll();
            let local = `${window.location.protocol}//${window.location.host}/user`;
            window.location.href = `https://idp.rockontrol.com/login?redirect_uri=${local}`;
        },
    },
};
</script>

<style lang="less" scoped>
.header {
    height: 42px;
    font-size: 20px;
    color: #ffffff;
    position: relative;
    // border-bottom: 2px solid #ff6131;
    &::after {
        content: "";
        width: 100%;
        height: 2px;
        background-color: #ff6131;
        position: absolute;
        left: 0;
        bottom: 0;
    }
    .logo {
        float: left;
        width: 200px;
        text-align: center;
        line-height: 42px;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            height: 24px;
            margin-right: 8px;
        }
    }
    .ant-menu {
        text-align: left;
        .ant-menu-item {
            &.ant-menu-item-selected {
                background-color: transparent;
                a {
                    color: #ff6131;
                    &:hover {
                        color: #ff6131;
                    }
                }
            }
            a {
                &:hover {
                    color: #ff6131;
                }
            }
        }
    }
    .return {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        padding: 0 10px;
    }
}
</style>
