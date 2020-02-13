<template>
    <div class="roleManagePage">
        <div class="contentTitleBottom">
            <div class="contentStyle">
                <div class="searchModel">
                    <search-model
                        :searchTitle="''"
                        :searchModelWidth="'200px'"
                        :searchFloat="'left'"
                        :searchPlacholder="'输入角色名称搜索'"
                        :searchModelMargin="'0 20px 0 0'"
                        v-on:searchClick="searchRole"
                        ref="searchModel">
                    </search-model>
                    <div class="reset fl tac cursorPointer" @click="resetCallback">重置</div >
                    <div class="creatRole fr colorBaseBlue cursorPointer" @click="showAddRoleDialog">
                        <div class="circle fl tac">
                            <div class="add">+</div>
                        </div>
                        <span>创建角色</span>
                    </div>
                </div>
                <ele-table :tableData="roleList" :tableHeaderData="roleManageHeaderData" :callbackObj="callbackObj"></ele-table>
            </div>
        </div>
        <message-dialog
            v-if="disableUserNumberMessageShow"
            :messageText="messageText"
            :iconShow="true"
            v-on:messageDialogCancel="cancelCallback"
            v-on:messageDialogConfirm="confirmCallback">
        </message-dialog>
        <rolePowerSetDialog
            v-if="rolePowerSetDialogShow"
            :rolePowerList="rolePowerList"
            :checkAll="checkAll"
            :checkedRoles="checkedRoles"
            v-on:rolePowerSetDialogCancel="roleSetCancelCallback"
            v-on:rolePowerSetDialogConfirm="roleSetConfirmCallback">
        </rolePowerSetDialog>
        <addRoleDialog
            v-if="addRoleDialogShow"
            v-on:addRoleDialogCancel="addRoleDialogCancel"
            v-on:addRoleDialogConfirm="addRoleDialogConfirm">
        </addRoleDialog>
        <updateRoleDialog
            v-if="updateRoleDialogShow"
            :inputValue="currentRow.roleName"
            v-on:updateRoleDialogCancel="updateRoleDialogCancel"
            v-on:updateRoleDialogConfirm="updateRoleDialogConfirm">
        </updateRoleDialog>
    </div>
</template>
<style lang="less" scoped>
    .creatRole{
        height: 14px;
        line-height: 14px;
        margin-top: 27px;
        .circle{
            width: 10px;
            height: 10px;
            line-height: 10px;
            border-radius: 50%;
            border: 2px solid #78ADF9;
            margin-right: 10px;
        }
    }
</style>
<script>
import eleTable from '../../common/eleTable'
import messageDialog from '../../dialogs/messageDialog'
import searchModel from '../../common/formComponents/searchModel'
import rolePowerSetDialog from '../../dialogs/rolePowerSetDialog'
import addRoleDialog from '../../dialogs/addRoleDialog'
import updateRoleDialog from '../../dialogs/updateRoleDialog'
import {roleManageHeaderData} from '../../../config/setting'
import {roleModelApi} from '../../../api/setting'
import {formatDate} from '../../../utils/formatDate'
import {validateEmptyString, IsInArray} from '../../../utils/validate'
import eventBus from '../../../utils/eventBus'
export default {
    name: 'roleManage',
    data () {
        return{
            roleManageTableData: [],
            roleManageHeaderData: [],
            disableUserNumberMessageShow: false,
            rolePowerSetDialogShow: false,
            callbackObj:{operate: [this.showDisableRoleDialog, this.showUpdateRoleDialog, this.showRolePowerSetDialog]},
            rolePowerList: [],
            addRoleDialogShow: false,
            roleList: [],
            messageText: '',
            currentRow:{}, // 当前操作的是哪一行
            currentIndex: '', //当前操作行的下标
            updateRoleDialogShow: false,
            checkAll: [], // 权限弹窗的父级全选状态
            checkedRoles: [], //二维数组 , 权限弹窗子级选中数组
            submitFlag: true
        }
    },
    methods: {
        // 禁用角色弹窗关闭回调
        cancelCallback () {
            this.disableUserNumberMessageShow = false;
        },
        // 禁用角色弹窗确认回调
        confirmCallback () {
            if (this.currentRow.status == '启用') {
                roleModelApi.disableRole({roleId: this.currentRow.roleId}, res => {
                    this.currentRow.status = '禁用';
                    this.currentRow.operate = [{name: '启用'}, {name: '修改'}, {name: '分配权限'}];
                }, err => {
                    this.$message("禁用角色失败");
                });
            } else {
                roleModelApi.startupRole({roleId: this.currentRow.roleId}, res => {
                    this.currentRow.status = '启用';
                    this.currentRow.operate = [{name: '禁用'}, {name: '修改'}, {name: '分配权限'}];
                }, err => {
                    this.$message("启用角色失败");
                });
            }
            this.disableUserNumberMessageShow = false;

        },
        showAddRoleDialog () {
            if (this.roleList.length < 5) {
                this.addRoleDialogShow = true; 
            } else {
                this.$message('最多只能添加5个角色');
            }
        },
        // 弹出禁用角色弹窗
        showDisableRoleDialog (row, index) {
            this.currentRow = row;
            if (row.status == '启用') {
                this.messageText = '是否确定禁用该角色';
            } else {
                this.messageText = '是否确定启用该角色';
            }
            this.disableUserNumberMessageShow = true;
        },
        // 弹出修改角色弹窗
        showUpdateRoleDialog (row, index) {
            this.currentRow = row;
            this.updateRoleDialogShow = true;
        },
        // 弹出分配权限弹窗
        showRolePowerSetDialog (row, index) {
            this.rolePowerList = [];
            this.checkAll = [];
            this.checkedRoles = [];
            this.currentRow = row;
            roleModelApi.getRolePower({roleId: row.roleId}, res => {
                res.data.data.menuResourceList.forEach(item => {
                    let tempObj = {};
                    tempObj.name = item.resourceName;
                    tempObj.resourceId = item.resourceId;
                    this.checkAll.push(item.flag);
                    if (!!item.children && item.children.length > 0) {
                        let tempArr = [];
                        tempObj.children = [];
                        tempObj.resourceIds = [];
                        item.children.forEach(ele => {
                            tempObj.children.push(ele.resourceName);
                            tempObj.resourceIds.push(ele.resourceId);
                            if (ele.flag) {
                                tempArr.push(ele.resourceName);
                            }
                        });
                        this.checkedRoles.push(tempArr);
                    } else {
                        this.checkedRoles.push([]);
                    }
                    this.rolePowerList.push(tempObj);
                });
            });
            this.rolePowerSetDialogShow = true;
        },
        // 分配权限弹窗关闭回调
        roleSetCancelCallback () {
            this.rolePowerSetDialogShow = false;
        },
        // 分配权限弹窗确认回调
        roleSetConfirmCallback () {
            let resourceIds = [];
            this.rolePowerList.forEach((item, index) => {
                if (this.checkAll[index]) {
                    resourceIds.push(item.resourceId);
                    if (!!item.children && item.children.length > 0) {
                        item.children.forEach((ite, ind) => {
                            if (IsInArray(this.checkedRoles[index], ite)) {
                                resourceIds.push(item.resourceIds[ind]);
                            }
                        })
                    }
                }
            });
            roleModelApi.assigneRolePower({roleId: this.currentRow.roleId, resourceIds: resourceIds}, res => {
                this.rolePowerSetDialogShow = false;
            }, err => {
                this.$message(err.data.errMsg);
            });
        },
        // 添加角色弹窗取消回调
        addRoleDialogCancel () {
            this.addRoleDialogShow = false;
        },
        // 添加角色弹窗确认回调
        addRoleDialogConfirm (value) {
            if (!validateEmptyString(value)) {
                if (this.submitFlag) {
                    this.submitFlag = false;
                    roleModelApi.addRole({roleName: value}, res => {
                        this.submitFlag = true;
                        this.addRoleDialogShow = false;
                        this.getRoleList({});
                    }, err => {
                        this.submitFlag = true;
                        this.$message(err.data.errMsg);
                        this.addRoleDialogShow = false;
                    });
                }
            } else {
                this.$message('请输入角色名称');
            }
        },
        // 修改角色取消回调
        updateRoleDialogCancel () {
            this.updateRoleDialogShow = false;
        },// 修改角色确认回调
        updateRoleDialogConfirm (value) {
            if (validateEmptyString(value)) {
                this.$message('请输入角色名称');
            } else {
                roleModelApi.updateRole({roleId: this.currentRow.roleId, roleName: value}, res => {
                    this.currentRow.roleName = value;
                    this.updateRoleDialogShow = false;
                    this.$message('修改角色成功');
                }, err => {
                    this.$message(err.data.errMsg);
                    this.updateRoleDialogShow = false;
                })
            }
        },
        // 获取角色列表
        getRoleList (data) {
            roleModelApi.getAllRoleData(data, res => {
                this.roleList = [];
                res.data.data.forEach(item => {
                   item.createTime = formatDate.getDate(item.createTime, 'YYYY-MM-DD HH:mm:ss');
                   item.operate = item.status == '0' ? [{name: '启用'}, {name: '修改'}, {name: '分配权限'}] : [{name: '禁用'}, {name: '修改'}, {name: '分配权限'}];
                   item.status = item.status == '0' ? "禁用" : "启用";
                   this.roleList.push(item);
                });
            }, err => {
                this.$message(err.data.errMsg);
            });
        },
        // 点击搜索按钮回调
        searchRole (value) {
            this.getRoleList({roleName: value});
        },
        resetCallback () {
            this.$refs.searchModel.searchValue = '';
            this.getRoleList({});
        }
    },
    created () {
        this.roleManageHeaderData = roleManageHeaderData;
        eventBus.$emit('setBreadcrumbs', '设置', '角色管理');
        this.getRoleList({});
    },
    components: {
        eleTable,
        searchModel,
        messageDialog,
        rolePowerSetDialog,
        addRoleDialog,
        updateRoleDialog
    }
}
</script>

