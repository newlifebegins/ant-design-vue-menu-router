// vue.config.js
const path = require("path");
const webpack = require("webpack");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const isProd = process.env.NODE_ENV === "production";
function resolve(dir) {
    return path.join(__dirname, dir);
}
const assetsCDN = {
    // webpack build externals
    externals: {
        vue: "Vue",
        "vue-router": "VueRouter",
        vuex: "Vuex",
        axios: "axios",
        echarts: "echarts",
    },
    css: [],
    // https://unpkg.com/browse/vue@2.6.10/
    js: [
        "//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js",
        "//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js",
        "//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js",
        "//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js",
        "//cdn.jsdelivr.net/npm/echarts@4.8.0/dist/echarts.min.js",
    ],
};
module.exports = {
    publicPath: "/",
    // pages: pagesObject,
    // 使用运行时编译器的 Vue 构建版本
    runtimeCompiler: true, // 开启生产环境SourceMap，设为false打包时不生成.map文件
    productionSourceMap: false, // 开启生产环境SourceMap，设为false打包时不生成.map文件
    lintOnSave: false,
    chainWebpack: (config) => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("assets", resolve("src/assets"))
            .set("components", resolve("src/components"));
        const svgRule = config.module.rule("svg");
        svgRule.uses.clear();
        svgRule.use("raw-loader").loader("raw-loader");
        if (isProd) {
            config.plugin("html").tap((args) => {
                args[0].cdn = assetsCDN;
                args[0].title = "企业工况监管";
                return args;
            });
            config
                .plugin("loadshReplace")
                .use(new LodashModuleReplacementPlugin());
        }
    },
    configureWebpack: () => {
        // config.externals = {
        //     "vue": "Vue",
        //     "vue-router": 'VueRouter',
        //     "vuex": "Vuex",
        //     // "mockjs": "Mock",
        //     "AMap": "AMap",
        //     "@antv/g2": "G2",
        //     "@antv/data-set": "DataSet",
        //     "macarons": "macarons",
        // };
        // 生产环境打包分析体积
        if (isProd) {
            return {
                plugins: [
                    // new BundleAnalyzerPlugin(),
                    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
                ],
                // if prod, add externals
                externals: assetsCDN.externals,
            };
        }
    },
    css: {
        loaderOptions: {
            less: {
                globalVars: {
                    menu_height: "42px",
                },
                modifyVars: {
                    "primary-color": "#FF6131", // 全局主色
                    "link-color": "#FF6131", // 链接色
                    "success-color": "#52c41a", // 成功色
                    "warning-color": "#faad14", // 警告色
                    "error-color": "#f5222d", // 错误色
                    "font-size-base": "14px", // 主字号
                },
                javascriptEnabled: true,
            },
        },
    },
    devServer: {
        open: false, // 是否自动打开浏览器页面
        host: "0.0.0.0", // 指定使用一个 host，默认是 localhost
        port: 8080, // 端口地址
        https: false, // 使用https提供服务
        // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
        proxy: {
            "/bb": {
                target: "http://beibei-test.rockontrol.com/",
                secure: false,
                changeOrigin: true,
            },
        },
    },
};
