import {apiGet, apiPost} from '../utils/request'

export const chefModel = {
  add: function (nickname, sex, type, headimgurl, info, videoUrl, collocationImgUrl, collocationInfo, likes, remark, success, fail) {
    const data = {
      nickname: nickname,
      sex: sex,
      type: type,
      headimgurl: headimgurl,
      info: info,
      videoUrl: videoUrl,
      collocationImgUrl: collocationImgUrl,
      collocationInfo: collocationInfo,
      likes: likes,
      remark: remark
    }
    apiPost("/chef/add", data, success, fail)
  },

  updateById: function (id, nickname, sex, type, headimgurl, info, videoUrl, collocationImgUrl, collocationInfo, likes, remark, success, fail) {
    const data = {
      id: id,
      nickname: nickname,
      sex: sex,
      type: type,
      headimgurl: headimgurl,
      info: info,
      videoUrl: videoUrl,
      collocationImgUrl: collocationImgUrl,
      collocationInfo: collocationInfo,
      likes: likes,
      remark: remark
    }
    apiPost("/chef/updateById", data, success, fail)
  },

  pagedQueryList: function (currentPage, pageSize, type, success, fail) {
    const data = {
      currentPage: currentPage,
      pageSize: pageSize,
      type: type
    }
    apiPost("/chef/pagedQueryList", data, success, fail)
  }

}
