/**
 * 用户相关api
 */
import {apiGet, apiPost} from '../utils/request'
import axios from "axios/index";


/**
 * 销售代理相关业务
 */
export const userModel = {

  /**
   * 注册
   * @param phone
   * @param password
   * @param organName  企业名称
   * @param businessLicenceCode 营业执照注册号
   * @param businessLicenceUrl 营业执照图片url
   * @param nickname 管理员昵称
   * @param account 管理员账号
   * @param email 邮箱
   * @param success
   * @param fail
   */
  register: function (phone, password, organName, businessLicenceCode, businessLicenceUrl, nickname, account, email, success, fail) {
    const data = {
      "phone": phone,
      "password": password,
      "organName": organName,
      "businessLicenceCode": businessLicenceCode,
      "businessLicenceUrl": businessLicenceUrl,
      "nickname": nickname,
      "account": account,
      "email": email
    }
    return apiPost('/reg/v1/add', data, success, fail);
  },

  /**
   * 登录
   * @param username
   * @param password
   * @param success
   * @param fail
   * @returns {*}
   */
  login: function (username, password, success, fail) {
    let loginData = {"username": username, "password": password};
    return apiPost('/token/v1/login', loginData, success, fail);
  },

  /**
   * 查询销售代理列表
   * @param currentPage
   * @param pageSize
   * @param success callback
   * @param fail callback
   * @returns {*}
   */
  queryList: function (currentPage, pageSize, success, fail) {
    return apiGet('/user/v1/pagedQueryList', {"currentPage": currentPage, "pageSize": pageSize}, success, fail);
  },

  /**
   * 更新销售代表
   * @param organizationId 机构主键ID
   * @param saleManagerId 销售代理主键ID
   * @param success callback
   * @param fail callback
   * @returns {*}
   */
  update: function (organizationId, saleManagerId, success, fail) {
    const data = {"organizationId": organizationId, "saleManagerId": saleManagerId};
    return apiPost('/resourceManager/v1/update', data, success, fail);
  },

  /**
   * 添加用户
   * @param phone 手机号
   * @param code 手机号验证码
   * @param nickname 昵称
   * @param account 账号
   * @param password 密码
   * @param success
   * @param fail
   * @returns {*}
   */
  addUser: function (data, success, fail) {
    return apiPost("/user/v1/add", data, success, fail)
  },

  /**
   * 分页查询用户
   * @param currentPage 当前页
   * @param pageSize 分页大小
   * @param success
   * @param fail
   * @returns {*}
   */
  pagedQueryList: function (data, success, fail) {
    return apiGet("/user/v1/pagedQueryList", data, success, fail)
  },

  /**
   * 停用用户
   * @param userId 用户主键ID
   * @param success
   * @param fail
   * @returns {*}
   */
  stopUser: function (data, success, fail) {
    return apiPost("/user/v1/stop", data, success, fail)
  },

  /**
   * 启动用户
   * @param userId 用户主键ID
   * @param success
   * @param fail
   * @returns {*}
   */
  startUser: function (data, success, fail) {
    return apiPost("/user/v1/start", data, success, fail)
  },

  /**
   * 删除用户
   * @param userId 用户主键ID
   * @param success
   * @param fail
   */
  deleteUser: function (userId, success, fail) {
    return apiPost("/user/v1/delete", {"userId": userId}, success, fail)
  },

  /**
   * 重置用户密码
   * @param userId 用户主键ID
   * @param password 新密码
   * @param success
   * @param fail
   */
  resetPwd: function (data, success, fail) {
    return apiPost("/user/v1/resetPwd", data, success, fail)
  },

  /**
   * 更新管理员信息
   * @param userId 用户主键ID
   * @param phone 手机号（可选）
   * @param code 手机号验证码（可选）
   * @param nickname 昵称
   * @param success
   * @param fail
   */
  updateAdminInfo: function (userId, phone, code, nickname, success, fail) {
    const data = {"userId": userId, "phone": phone, "code": code, "nickname": nickname}
    return apiPost("/user/v1/update", data, success, fail)
  },

  /**
   * 查询机构列表
   * @param currentPage
   * @param pageSize
   * @param organizationName 机构名称（可选）
   * @param saleManagerName 销售代理姓名（可选）
   */
  queryOrgList: function(currentPage, pageSize, organizationName, saleManagerName, success, fail){
    const data = {"currentPage": currentPage, "pageSize":pageSize, "organizationName": organizationName, "saleManagerName":saleManagerName};
    return apiGet("/resourceManager/v1/pagedQueryList", data, success, fail);
  },

  /**
   * 查询当前登录用户信息
   * @param success
   * @param fail
   */
  queryCurrentUser: function (success, fail) {
    return apiGet("/user/v1/queryCurrentUser", {}, success, fail);
  }
}
