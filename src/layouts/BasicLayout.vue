<template>
    <div class="layout-container">
        <a-layout>
            <a-layout class="content-layout">
                <a-layout-sider
                    width="200"
                    v-model="collapsed"
                    collapsible
                    v-if="siderMenu.length"
                >
                    <sider-layout :siderMenu="siderMenu"></sider-layout>
                </a-layout-sider>
                <a-layout-content>
                    <router-view />
                </a-layout-content>
            </a-layout>
            <!-- <a-layout-footer>
        <a-footer />
            </a-layout-footer>-->
        </a-layout>
    </div>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";
// import AFooter from "./FooterLayout.vue";
import SiderLayout from "./SiderLayout.vue";
export default {
    name: "baseLayout",
    data() {
        return {
            collapsed: false,
        };
    },
    computed: {
        ...mapState("user", ["menus"]),
        siderMenu() {
            // console.log(this.$route);
            // console.log(this.menus);
            // let matched = this.$route.matched;
            let subMenu = _.find(this.menus[0].children, (o) => {
                return o.path && this.$route.path.includes(o.path);
            });
            // let subMenu = this.menus[0].children;
            // console.log(subMenu);
            return subMenu.children;
        },
    },
    mounted() {},
    components: {
        // AFooter,
        SiderLayout,
    },
    methods: {},
};
</script>

<style lang="less" scoped>
.layout-container {
    width: 100%;
    height: calc(100vh - 42px);
    overflow: hidden;
    overflow-y: auto;
    .ant-layout {
        height: 100%;
    }
    .ant-layout:not(.content-layout) {
        // height: 100%;
        // overflow-y: auto;
    }
    .ant-layout-header {
        height: auto;
        background-color: #ffffff;
        padding: 0;
        // border-bottom: 1px solid $border-color;
    }
    .content-layout {
        .ant-layout-sider {
            //   background-color: #f9fafc;
            // border-right: 1px solid $border-color;
        }
        .ant-layout-content {
            background: rgba(241, 243, 246, 1);
            // height: 100%;
            padding: 14px 20px;
            overflow-y: auto;
        }
    }
    .ant-layout-footer {
        padding: 0;
        background-color: #ffffff;
    }
}
</style>
