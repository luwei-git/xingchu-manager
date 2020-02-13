<template>
    <div class="userManagePage">
        <div class="contentTitleBottom">
            <div class="contentStyle">
                <div class="searchModel">
                    <search-model
                        :searchTitle="''"
                        :searchModelWidth="'200px'"
                        :searchFloat="'left'"
                        :searchPlacholder="'输入用户名搜索'"
                        :searchModelMargin="'0 20px 0 0'"
                        v-on:searchClick="searchUser"
                        ref="searchModel">
                    </search-model>
                    <div class="reset fl tac cursorPointer" @click="resetCallback">重置</div >
                    <div class="creatRole fr colorBaseBlue cursorPointer" @click="showAddUserDialog">
                        <div class="circle fl tac">
                            <div class="add">+</div>
                        </div>
                        <span>新增用户</span>
                    </div>
                </div>
                <ele-table :tableData="userManageTableData" :tableHeaderData="userManageHeaderData" :callbackObj="callbackObj"></ele-table>
                <pagination
                    :total="pagenationTotal" 
                    :pageSize="tableColumnSize"
                    :currentChangeCallback="currentChangeCallback"
                    v-on:paginationSizeChange="paginationSizeChange"
                    ref="pagination">
                </pagination>
            </div>
        </div>
        <message-dialog
            v-if="disableUserNumberMessageShow"
            :messageText="messageText"
            :iconShow="true"
            v-on:messageDialogCancel="cancelCallback"
            v-on:messageDialogConfirm="confirmCallback">
        </message-dialog>
        <resetPasswordDialog
            v-if="resetPasswordDialogShow"
            v-on:resetPasswordDialogCancel="resetPasswordDialogCancel"
            v-on:resetPasswordDialogConfirm="resetPasswordDialogConfirm">
        </resetPasswordDialog>
        <addUserDialog
            v-if="addUserDialogShow"
            v-on:addUserDialogCancel="addUserDialogCancel"
            v-on:addUserDialogConfirm="addUserDialogConfirm">
        </addUserDialog>
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
import pagination from '../../common/pagination'
import messageDialog from '../../dialogs/messageDialog'
import searchModel from '../../common/formComponents/searchModel'
import resetPasswordDialog from '../../dialogs/resetPasswordDialog'
import addUserDialog from '../../dialogs/addUserDialog'
import {userManageHeaderData} from '../../../config/setting'
import {userModel} from '../../../api/userApi'
import {formatDate} from '../../../utils/formatDate'
import eventBus from '../../../utils/eventBus'
export default {
    name: 'userManage',
    data () {
        return{
            userManageHeaderData: [],
            userManageTableData: [],
            pagenationTotal: 0,
            currentPage: 1,
            tableColumnSize: 10,
            disableUserNumberMessageShow: false,
            callbackObj: {operate: [this.disableUserNumber, this.showResetPasswordDialog]},
            resetPasswordDialogShow: false,
            addUserDialogShow: false,
            messageText: '',
            currentRow: {},
            submitFlag: true
        }
    },
    methods: {
        currentChangeCallback (currentPage) {
            this.currentPage = currentPage;
            this.getUserList({currentPage: this.currentPage, pageSize: this.tableColumnSize});
        },
        paginationSizeChange (size) {
            this.tableColumnSize = size;
            this.getUserList({currentPage: this.currentPage, pageSize: this.tableColumnSize});
        },
        disableUserNumber (row, index) {
             this.currentRow = row;
            if (row.status == '启用') {
                this.messageText = '是否确定禁用该账号';
            } else {
                this.messageText = '是否确定启用该账号';
            }
            this.disableUserNumberMessageShow = true;
        },
        cancelCallback () {
            this.disableUserNumberMessageShow = false;
        },
        confirmCallback () {
            if (this.currentRow.status == '启用') {
                userModel.stopUser({userId: this.currentRow.userId}, res => {
                    this.currentRow.status = '禁用';
                    this.currentRow.operate = [{name: '启用'}, {name: '重置密码'}];
                }, err => {
                    this.$message(err.data.errMsg);
                });
            } else {
                userModel.startUser({userId: this.currentRow.userId}, res => {
                    this.currentRow.status = '启用';
                    this.currentRow.operate = [{name: '禁用'}, {name: '重置密码'}];
                }, err => {
                    this.$message(err.data.errMsg);
                });
            }
            this.disableUserNumberMessageShow = false;
        },
        // 显示重置密码弹窗
        showResetPasswordDialog (row, index) {
            this.currentRow = row;
            this.resetPasswordDialogShow = true;
        },
        resetPasswordDialogCancel () {
            this.resetPasswordDialogShow = false;
        },
        resetPasswordDialogConfirm (value) {
            userModel.resetPwd({userId: this.currentRow.userId, password: value}, res => {
                this.$message('重置密码成功');
                this.resetPasswordDialogShow = false;
            }, err => {
                this.$message(err.data.errMsg);
            })
        },
        showAddUserDialog () {
            this.addUserDialogShow = true;
        },
        addUserDialogCancel () {
            this.addUserDialogShow = false;
        },
        addUserDialogConfirm (value) {
            if (this.submitFlag) {
                this.submitFlag = false;
                userModel.addUser(value, res => {
                    this.submitFlag = true;
                    this.addUserDialogShow = false;
                    this.getUserList({currentPage: 1, pageSize: this.tableColumnSize});
                }, err => {
                    this.submitFlag = true;
                    this.$message(err.data.errMsg);
                });
            }
        },
        getUserList (data) {
            this.userManageTableData = [];
            userModel.pagedQueryList(data, res => {
                this.pagenationTotal = res.data.data.totalNum;
                res.data.data.items.forEach(item => {
                    item.operate = item.status == '0' ? [{name: '启用'}, {name: '重置密码'}] : [{name: '禁用'}, {name: '重置密码'}];
                    item.status = item.status == '0' ? "禁用" : "启用";
                    item.createTime = formatDate.getDate(item.createTime, 'YYYY-MM-DD HH:mm:ss');
                    this.userManageTableData.push(item);
                });
            }, err => {
                this.$message(err.data.errMsg);
            });
        },
        searchUser (value) {
            this.getUserList({currentPage: 1, pageSize: this.tableColumnSize, nickname: value});
        },
        resetCallback () {
            this.$refs.searchModel.searchValue = '';
            this.getUserList({currentPage: this.currentPage, pageSize: this.tableColumnSize});
        }
    },
    created () {
        this.userManageHeaderData = userManageHeaderData;
        eventBus.$emit('setBreadcrumbs', '设置', '用户管理');
        this.getUserList({currentPage: this.currentPage, pageSize: this.tableColumnSize});
    },
    components: {
        eleTable,
        pagination,
        searchModel,
        messageDialog,
        resetPasswordDialog,
        addUserDialog
    }
}
</script>
