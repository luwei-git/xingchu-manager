import {apiGet, apiPost} from '../utils/request'
// 待发货列表接口
export const orderManageModel = {
    // 订单分页查询
    getAllOrder (data, success, fail) {
        return apiGet('/order/v1/pagedQueryList', data, success, fail);
    },
    // 订单审核
    orderAudit (data, success, fail) {
        return apiPost('/order/v1/audit', data, success, fail);
    },
    // 待发货订单查询
    deliveryOrder (data, success, fail) {
        return apiGet('/order/v1/pagedSendQueryList', data, success, fail);
    },
    //获取快递公司列表
    getExpressList (data, success, fail) {
        return apiGet('/order/v1/queryExpressList', data, success, fail);
    },
    // 订单发货
    orderSend (data, success, fail) {
        return apiPost('/order/v1/send', data, success, fail);
    },
    // 签收订单列表查询
    orderSignList (data, success, fail) {
        return apiGet('/order/v1/pagedAsignQueryList', data, success, fail);
    },
    orderSign (data, success, fail) {
        return apiPost('/order/v1/asign', data, success, fail);
    },
    orderCancel (data, success, fail) {
        return apiPost('/order/v1/cancel', data, success, fail);
    }
}