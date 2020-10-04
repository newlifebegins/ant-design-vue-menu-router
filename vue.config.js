// vue.config.js
const path = require("path");

module.exports = {
    lintOnSave: false,
    css: {
        loaderOptions: {
            less: {
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
                target: "http://view-work.beibei-onemap.rockontrol.com/",
                secure: false,
                changeOrigin: true,
            },
        },
    },
};
