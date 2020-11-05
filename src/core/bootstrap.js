import storage from "store";

export default function Initializer() {
    let code = getUrlParam("code") || storage.get("code");
    // let access_token = getUrlParam('access_token') || storage.get('access_token');
    // let uid = getUrlParam('uid') || localStorage.getItem('uid');
    let local = window.location.href;
    let { IDP_URL, CLIENT_ID } = window.url;
    if (code == null || code == "") {
        window.location.href = `${IDP_URL}/authorize?redirect_uri=${local}&client_id=${CLIENT_ID}&response_type=code`;
    } else {
        storage.set("code", code);
        // getToken({code}).then(res => {
        //     console.log(res)
        //     if(res.data) {
        //         let {access_token,audience} = res.data;
        //         storage.set('access_token', access_token);
        //         storage.set('uid', audience + '');
        //         localStorage.setItem('uid', audience);
        //     }
        // })
        // this.$router.push({ path: "/user" });
    }
}

// 截取url参数
function getUrlParam(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = window.location.search.split("?")[1]
        ? window.location.search.split("?")[1].match(reg)
        : null;
    if (r != null) {
        return decodeURI(r[2]);
    }
    return null;
}
