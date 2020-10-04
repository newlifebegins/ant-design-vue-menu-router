import storage from "store";
export default function Initializer() {
    let access_token =
        getUrlParam("access_token") || storage.get("access_token");
    let uid = getUrlParam("uid") || storage.get("uid");
    let local = window.location.href;
    if (access_token == null || access_token == "") {
        window.location.href = `https://idp.rockontrol.com/login?redirect_uri=${local}`;
    } else {
        storage.set("access_token", access_token);
        storage.set("uid", uid);
        // this.$router.push({ path: "/user" });
    }
}

// 截取url参数
function getUrlParam(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = window.location.hash.split("#")[1]
        ? window.location.hash.split("#")[1].match(reg)
        : null;
    if (r != null) {
        return decodeURI(r[2]);
    }
    return null;
}
