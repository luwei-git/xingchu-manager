const CryptoJS = require('crypto-js');  //引用AES源码js

const key = CryptoJS.enc.Utf8.parse("sptaicaresnetspt");  //十六位字符串作为密钥

//加密方法
export const Encrypt = (word) => {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
}