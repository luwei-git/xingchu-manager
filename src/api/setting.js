import {apiGet, apiPost} from '../utils/request'
export const roleModelApi = {
    // 查询角色列表数据
    getAllRoleData (data, success, fail) {
        return apiGet('/role/v1/queryList', data, success, fail);
    },
    // 新增角色
    addRole (data, success, fail) {
        return apiPost('/role/v1/add', data, success, fail);
    },
    // 修改角色
    updateRole (data, success, fail) {
        return apiPost('/role/v1/update', data, success, fail);
    },
    // 禁用角色
    disableRole (data, success, fail) {
        return apiPost('/role/v1/disable', data, success, fail);
    },
    // 启用角色
    startupRole (data, success, fail) {
        return apiPost('/role/v1/startup', data, success, fail);
    },
    // 根据角色查询所有权限列表以及本角色所拥有权限
    getRolePower (data, success, fail) {
        return apiGet('/role/v1/queryResourceById', data, success, fail);
    },
    // 分配角色权限
    assigneRolePower (data, success, fail) {
        return apiPost('/role/v1/assignedResources', data, success, fail); 
    }
}