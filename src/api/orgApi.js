/**
 * 机构相关api
 */
import {apiGet, apiPost} from '../utils/request'

export const orgModel = {

  /**
   * 通过机构id查询机构详情
   * @param organId 机构id
   * @param success
   * @param fail
   */
  queryByOrganId (data, success, fail){
    return apiGet("/reg/v1/queryByOrganId", data, success, fail);
  },
  updateOrgDetail (data, success, fail) {
    return apiPost('/reg/v1/updateById', data, success, fail);
  }
}
