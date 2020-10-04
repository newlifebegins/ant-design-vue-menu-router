import request from "@/utils/request";

const userApi = {
    Login: "/bb/v1/sys/login/idp/token",
    UserMenu: "/bb/v1/sys/menu/load",
};

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login(parameter) {
    return request({
        url:
            userApi.Login +
            "?sysCode=" +
            parameter.sysCode +
            "&token=" +
            parameter.token,
        method: "post",
        data: parameter,
    });
}

export function getCurrentUserNav() {
    return request({
        url: userApi.UserMenu,
        method: "get",
    });
}
