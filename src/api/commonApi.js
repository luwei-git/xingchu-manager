/**
 * 通用api
 */
import {apiGet, apiPost} from '../utils/request'

export const commonModel = {

  /**
   * 发送验证码
   * @param phone 手机号
   * @param success
   * @param fail
   * @returns {*}
   */
  sendCode: function (phone, success, fail) {
    const data = {"phone": phone}
    return apiPost("/common/v1/sendCode", data, success, fail);
  },

  /**
   * 上传图片
   * @param filedata 文件数据
   * @param success
   * @param fail
   * @returns {*}
   */
  uploadImg: function (filedata, success, fail) {
    return apiPost("/common/v1/uploadImg", {"filedata": filedata}, success, fail)
  },

  /**
   * 校验验证码
   * @param phone 手机号
   * @param code 验证码
   * @param success
   * @param fail
   * @returns {*}
   */
  chcekCode: function (phone, code, success, fail) {
    return apiPost("/common/v1/chcekCode", {"phone": phone, "code": code}, success, fail)
  }

}
