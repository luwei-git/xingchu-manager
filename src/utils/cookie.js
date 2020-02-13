import cookie from 'js-cookie'
const prefix = 'platForm';
export const Cookie = {
    accountKey: 'account',
    tokenKey: 'token',
    refreshTokenKey: 'refreshToken',
    organIdKey: 'organId',
    userIdKey: 'userId',
    set (key, token) {
        return cookie.set(prefix + key, token);
    },
    get (key) {
        return cookie.get(prefix + key);
    },
    remove (key) {
        return cookie.remove(prefix + key);
    }
}
