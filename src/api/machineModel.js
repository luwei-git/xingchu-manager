import {apiGet, apiPost} from '../utils/request'

export const machineModel = {
  add: function (name, sortNum, address, latitude, longitude, success, fail) {
    const data = {
      "name": name,
      "sortNum": sortNum,
      "address": address,
      "latitude": latitude,
      "longitude": longitude,
      "startTime": "00:00",
      "endTime": "23:59"
    }
    apiPost("/storeAddress/add", data, success, fail)
  },

  updateById: function (id, name, sortNum, address, latitude, longitude, success, fail) {
    const data = {
      "id": id,
      "name": name,
      "sortNum": sortNum,
      "address": address,
      "latitude": latitude,
      "longitude": longitude,
      "startTime": "00:00",
      "endTime": "23:59"
    }
    apiPost("/storeAddress/updateById", data, success, fail)
  },

  deleteById: function (id, success, fail) {
    const data = {
      "id": id
    }
    apiPost("/storeAddress/deleteById", data, success, fail)
  },

  pagedQueryList: function (currentPage, pageSize, success, fail) {
    const data = {
      "currentPage": currentPage,
      "pageSize": pageSize,
      "latitude": 114.517886,
      "longitude": 22.595028,
      "status": 1,
    }
    apiPost("/storeAddress/pagedQueryList", data, success, fail)
  }

}
