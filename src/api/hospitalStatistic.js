import {apiGet, apiPost} from '../utils/request'
export const hospitalStatisticModel = {
    // 获取用户所在机构总统计
    getOrganizitionStatistic (data, success, fail) {
        return apiGet('/stat/v1/organ', data, success, fail);
    },
    // 根据时间类型获取机构统计
    getOrgStatisticByTime (data, success, fail) {
        return apiGet('/stat/v1/organ/type', data, success, fail);
    },
    // 根据时间获取机构分页统计
    getOrgStatisticPagenation (data, success, fail) {
        return apiGet('/stat/v1/organ/pagedQueryList', data, success, fail);
    },
    // 根据时间类型获取医院统计
    getHospitalStatisticByTime (data, success, fail) {
        return apiGet('/stat/v1/hospital/type', data, success, fail);
    },
    // 根据时间获取医院分页统计
    getHospitalStatisticPagenation (data, success, fail) {
        return apiGet('/stat/v1/hospital/pagedHospitalTotalStatListToOrganName', data, success, fail);
    },
    // 获取医院详情统计
    getHospitalStatistic (data, success, fail) {
        return apiGet('/stat/v1/hospital', data, success, fail);
    },
    // 获取医院每天统计
    getHospitalStatisticByDay (data, success, fail) {
        return apiGet('/stat/v1/hospital/user', data, success, fail);
    },
    // 获取医院每天分页统计
    getHospitalStatisticPagenationByDay (data, success, fail) {
        return apiGet('/stat/v1/user/pagedUserTotalStatListToUserName', data, success, fail);
    },
    // 获取医院统计列表(首页)
    getHospitalList (data, success, fail) {
        return apiGet('/stat/v1/hospital/List', data, success, fail);
    },
    // 获取所有医院资源管理
    getAllHospitalResource (data, success, fail) {
        return apiGet('/resourceManager/v1/pagedQueryList', data, success, fail);
    },
    // 获取所有销售代理
    getAllSellingAgent (data, success, fail) {
        return apiGet('/user/v1/queryList', data, success, fail);
    },
    // 更换销售代理
    changeSellingAgent (data, success, fail) {
        return apiPost('/resourceManager/v1/update', data, success, fail);
    }
}