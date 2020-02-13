// 验证手机号码 , 符合规则返回true, 不符合返回false
export const validatePhoneNumber = (str) => {
    const reg = /^1[3-9][0-9]{9}$/;
    return reg.test(str);
}
// 验证是否为空串
export const validateEmptyString = (str) => {
    if (typeof(str) === 'string') {
        return str.trim() === '';
    } else {
        throw new Error('parame is not a string');
    }
}
//验证登录密码
export const validatePassword = (password) => {
    let reg = /^\w{6,16}$/;
    if (reg.test(password)) {
        return true;
    } else {
        return false;
    }
}
// 判断数组中是否存在某个值 , 存在返回true , 不存在返回false
export const IsInArray = (arr,val) => {
　　var testStr = ',' + arr.join(",") + ",";
　　return testStr.indexOf("," + val + ",") != -1;
}
// 判断字符串是否有空格 , 有返回true
export const hasSpace = (str) => {
    return /\s+/g.test(str);
}

//验证邮箱 , 符合规则返回true, 不符合返回false
export const validateEmail = (email) => {
    return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(email);
}
// 验证固定电话
export const valitateTel = (tel) => {
    return /^0\d{2,3}-?\d{7,8}$/.test(tel);
}