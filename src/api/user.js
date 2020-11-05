/**
 * 请求统一管理
 */
import Request from '@/utils/request';
const Api = {
    login: `/bb/v1/sys/login/idp/token`,
    token: `/bb/v1/sys/idp/code`,
    menu: `/bb/v1/sys/menu/load`,
};

/**
 * 登录
 * @param {*} params
 */
export const login = params =>
    Request.post(Api.login + '?sysCode=' + params.sysCode + '&token=' + params.token, params);

/**
 * 通过code获取token
 * @param {*} params
 */
export const getToken = params => Request.get(Api.token, params);

/**
 * 获取菜单
 * @param {*} params
 */
export const getMenu = params =>
    Request.get(
        Api.menu,
        {},
        {
            'Authorization-bb': 'Bearer ' + params.jwt,
        },
    );
