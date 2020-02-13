import {apiGet, apiPost} from '../utils/request'

export const foodModel = {
  add: function (name, money, detail, likes, type, tag, calorie, status, menuUrl, logoUrl, remark, createUserId, menuRelations, success, fail) {
    const data = {
      "name": name,
      "money": money,
      "detail": detail,
      "likes": likes,
      "type": type,
      "tag": tag,
      "calorie": calorie,
      "status": status,
      "menuUrl": menuUrl,
      "logoUrl": logoUrl,
      "remark": remark,
      "createUserId": createUserId,
      "menuRelationIds": menuRelations
    }
    apiPost("/menu/add", data, success, fail)
  },

  updateById: function (menuId, name, money, detail, likes, type, tag, calorie, status, menuUrl, logoUrl, remark, createUserId, menuRelations, success, fail) {
    const data = {
      "menuId": menuId,
      "name": name,
      "money": money,
      "detail": detail,
      "likes": likes,
      "type": type,
      "tag": tag,
      "calorie": calorie,
      "status": status,
      "menuUrl": menuUrl,
      "logoUrl": logoUrl,
      "remark": remark,
      "createUserId": createUserId,
      "menuRelationIds": menuRelations
    }
    apiPost("/menu/updateById", data, success, fail)
  },

  pagedQueryList: function (currentPage, pageSize, success, fail) {
    const data = {
      currentPage: currentPage,
      pageSize: pageSize
    }
    apiPost("/menu/pagedQueryList", data, success, fail)
  },

  pagedQueryListForStarFood: function (success, fail) {
    const data = {
      currentPage: 1,
      pageSize: 100,
      type: 2,
    }
    apiPost("/menu/pagedQueryList", data, success, fail)
  },

  queryNoStarFood: function (success, fail) {
    const data = {
      currentPage: 1,
      pageSize: 100,
      type: 3,
    }
    apiPost("/menu/pagedQueryList", data, success, fail);
  },

  deleteById: function (id, success, fail) {
    const data = {
      menuId: id
    }
    apiPost("/menu/delete", data, success, fail);
  }
}
