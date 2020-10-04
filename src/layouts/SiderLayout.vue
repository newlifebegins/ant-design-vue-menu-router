<template>
    <a-menu
        mode="inline"
        theme="dark"
        :style="{ height: '100%', borderRight: 0, textAlign: 'left' }"
        :defaultSelectedKeys="defaultSelectedKeys"
        :defaultOpenKeys="defaultOpenKeys"
        :selectedKeys="defaultSelectedKeys"
        :openKeys.sync="openKeys"
        v-if="siderMenu.length"
    >
        <template v-for="item in siderMenu">
            <a-menu-item :key="item.path" v-if="!item.children.length">
                <router-link :to="{ name: item.path }">
                    <a-icon type="user" />
                    <span>{{ item.label }}</span>
                </router-link>
            </a-menu-item>
            <sub-menu v-else :menu-info="item" :key="item.path"></sub-menu>
        </template>
    </a-menu>
</template>

<script>
import SubMenu from "./SubMenu.vue";
// import { getStore } from '@/utils/util';
// import { mapState } from "vuex";
// import _ from "lodash";
export default {
    props: ["siderMenu"],
    data() {
        return {
            openKeys: [],
        };
    },
    components: { SubMenu },
    computed: {
        defaultOpenKeys: {
            get: function() {
                let matched = this.$route.matched;
                // console.log(matched[matched.length - 2].name);
                // return [matched[matched.length - 2].name];
                this.openKeys = [matched[matched.length - 2].name];
            },
            set: function(newVal) {
                // console.log(newVal);
                this.openKeys = [newVal[1]];
            },
        },
        defaultSelectedKeys() {
            let matched = this.$route.matched;
            return [matched[matched.length - 1].name];
        },
    },

    methods: {},
};
</script>

<style></style>
