<template>
    <div id="app">
        <a-layout-header v-if="headerMenu.length">
            <a-header :headerMenu="headerMenu" />
        </a-layout-header>
        <router-view />
    </div>
</template>
<script>
import AHeader from "@/layouts/HeaderLayout.vue";
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
import "moment/locale/zh-cn";
import { mapState } from "vuex";
export default {
    name: "App",
    provide: {},
    data() {
        return {
            locale: zh_CN,
        };
    },
    components: {
        AHeader,
    },
    computed: {
        ...mapState("user", ["menus"]),
        headerMenu() {
            // console.log(this.menus);
            let menus =
                (this.menus && this.menus.length && this.menus[0].children) ||
                [];
            return menus;
        },
    },
    mounted() {},
    methods: {},
};
</script>
<style lang="less">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
.ant-layout-header {
    height: auto !important;
    background-color: #ffffff !important;
    padding: 0 !important;
    // border-bottom: 1px solid $border-color;
    width: 100%;
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "SF UI Text",
        "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
}
</style>
