import {apiGet, apiPost} from '../utils/request'

export const goodsWayModel = {
  add: function (sortNum, store, num, goodId, remark, success, fail) {
    const data = {
      "name": sortNum,
      "sortNum": sortNum,
      "store": store,
      "num": num,
      "id": store,
      "goodId": goodId,
      "status": 1,
      "remark": remark
    }
    apiPost("/goodWay/add", data, success, fail)
  },

  updateById: function (id, sortNum, store, num, goodId, remark, success, fail) {
    const data = {
      "id": id,
      "name": sortNum,
      "sortNum": sortNum,
      "store": store,
      "num": num,
      "goodId": goodId,
      "status": 1,
      "remark": remark
    }
    apiPost("/goodWay/updateById", data, success, fail)
  },

  deleteById: function (id, success, fail) {
    const data = {
      "id": id,
      "status": 2
    }
    apiPost("/goodWay/deleteById", data, success, fail)
  },

  pagedQueryList: function (currentPage, pageSize, machineId, success, fail) {
    const data = {
      "currentPage": currentPage,
      "pageSize": pageSize,
      "store": machineId
    }
    apiPost("/goodWay/pagedQueryList", data, success, fail)
  }

}
