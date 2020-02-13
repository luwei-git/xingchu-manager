<template>
    <div class="pendingDeliveryOrderPage">
        <div class="contentTitleBottom">
            <div class="contentStyle">
                <div class="searchModel">
                    <inputModel
                        :inputTitle="''"
                        :inputValue="searchWord"
                        :inputModelWidth="'200px'"
                        :inputPlacholder="'订单号/订购人/联系电话'"
                        :inputModelMargin="'0 20px 0 0'"
                        :inputFloat="'left'"
                        v-on:inputEvent="setSearchWord">
                    </inputModel>
                     <selectModel
                        :selectTitle="'审核状态 :'"
                        :selectValue="selectText"
                        :selectModelWidth="'200px'"
                        :selectModelDisabled="false"
                        :selectFloat="'left'"
                        :selectList="auditStatusList"
                        v-on:selectChoose="setAuditStatus">
                    </selectModel>
                    <div class="search fl tac cursorPointer" @click="search">查询</div>
                    <div class="reset fl tac cursorPointer" @click="resetCallback">重置</div >
                </div>
                <eleTable :tableData="deliveryTableData" :tableHeaderData="tableHeaderData" :callbackObj="callbackObj"></eleTable>
                <pagination
                    :total="pagenationTotal" 
                    :pageSize="tableColumnSize"
                    :currentChangeCallback="currentChangeCallback"
                    v-on:paginationSizeChange="paginationSizeChange"
                    ref="pagination">
                </pagination>
            </div>
        </div>
        <deliveryDialog 
            v-if="deliveryDialogVisible"
            :deliveryDialogData="dialogData"
            v-on:deliveryDialogCancel="deliveryDialogCancel"
            v-on:deliveryDialogConfirm="deliveryDialogConfirm">
        </deliveryDialog>
        <orderAuditingDialog
            v-if="auditDialogShow"
            :orderAuditingDialogData="dialogData"
            v-on:orderAuditDialogCancel="auditDialogCancel"
            v-on:orderAuditDialogConfirm="auditDialogConfirm">
        </orderAuditingDialog>
        <confirmDialog
            v-if="confirmDialogVisible"
            :confirmTitle="'确认取消'"
            :confirmContent="'确定要取消该订单吗？'"
            v-on:confirmDialogCancel="confirmDialogCancel"
            v-on:confirmDialogConfirm="confirmDialogConfirm">
        </confirmDialog>
    </div>
</template>
<style lang="less" scoped>
    
</style>
<script>
import inputModel from '../../common/formComponents/inputModel'
import selectModel from '../../common/formComponents/selectModel'
import eleTable from '../../common/eleTable'
import {deliveryOrderTableHeaderData} from '../../../config/orderManage'
import deliveryDialog from '../../dialogs/deliveryDialog'
import confirmDialog from '../../dialogs/confirmDialog'
import pagination from '../../common/pagination'
import orderAuditingDialog from '../../dialogs/orderAuditingDialog'
import {orderManageModel} from '../../../api/orderManage'
import {formatDate} from '../../../utils/formatDate'
import {auditStatusDicObj, orderStatusDicObj, auditStatusList} from '../../../config/commonDic'
import eventBus from '../../../utils/eventBus'
const payStatusMap = {0:"未支付",1:"已支付",2:"支付失败",3:"已退款",4:"退款失败"};
export default {
    name: 'pendingDeliveryOrder',
    data () {
        return {
            searchWord: '', // 查询关键词
            tableHeaderData: [],
            callbackObj: {operate: [this.showAuditingDialog, this.showDeliveryDialog, this.showConfirmDialog]},
            deliveryTableData: [],
            deliveryDialogVisible: false,
            pagenationTotal: 0,
            tableColumnSize: 10,
            auditDialogShow: false,
            currentPage: 1,
            sendStatus: '0', // 发货状态
            currentRow: {},
            currentIndex: '',
            dialogData: {},
            auditStatusList: [],
            auditStatus: '', // 查询条件--审核状态
            selectText: '',
            confirmDialogVisible: false
        }
    },
    methods: {
        // 弹出审核弹窗
        showAuditingDialog (row, index) {
            this.currentRow = row;
            this.dialogData = row;
            if (row.sendStatus == '已发货') {
                this.$message('订单已发货 , 请勿重复审核');
            } else {
                this.auditDialogShow = true;
            }
        },
        // 弹出发货弹窗
        showDeliveryDialog (row, index) {
            this.currentRow = row;
            this.dialogData = row;
            this.currentIndex = index;
            if (row.auditStatus != '审核通过') {
                this.$message('该订单尚未通过审核 , 请先审核订单');
            } else if (row.sendStatus == '已发货') {
                this.$message('订单已发货 , 请勿重复发货');
            } else {
                this.deliveryDialogVisible = true;
            }
        },
        // 弹出确认取消订单弹窗
        showConfirmDialog (row, index) {
            this.confirmDialogVisible = true;
            this.currentRow = row;
        },
        deliveryDialogCancel () {
            this.deliveryDialogVisible = false;
        },
        deliveryDialogConfirm (data) {
            orderManageModel.orderSend(data, res => {
                this.deliveryTableData.splice(this.currentIndex, 1);
                this.pagenationTotal = this.pagenationTotal -1;
            }, err => {
                this.$message(err.data.errMsg);
                this.getAllDeliveryOrder({currentPage: this.currentPage, pageSize: this.tableColumnSize});
            })
            this.deliveryDialogVisible = false;
        },
        confirmDialogCancel () {
            this.confirmDialogVisible = false;
        },
        confirmDialogConfirm () {
            this.confirmDialogVisible = false;
            orderManageModel.orderCancel({orderId: this.currentRow.orderId}, res => {
                this.getAllDeliveryOrder({currentPage: this.currentPage, pageSize: this.tableColumnSize});
            })
        },
        currentChangeCallback (currentPage) {
            this.currentPage = currentPage;
            this.getAllDeliveryOrder({currentPage: this.currentPage, pageSize: this.tableColumnSize});
        },
        paginationSizeChange (size) {
            this.tableColumnSize = size;
            this.getAllDeliveryOrder({currentPage: this.currentPage, pageSize: this.tableColumnSize});
        },
        auditDialogConfirm (data) {
            orderManageModel.orderAudit(data, res => {
                this.currentRow.auditStatus = auditStatusDicObj[data.auditStatus];
                this.currentRow.auditOpinion = data.auditOpinion;
                this.currentRow.operate = this.currentRow.auditStatus == '审核通过' ? [{name: '审核'}, {name: '发货'}, {name: '取消订单'}] : [{name: '审核'}, {name: '发货', disabled: true}, {name: '取消订单'}];
            }, err => {
                this.$message(err.data.errMsg);
            });
            this.auditDialogShow = false;
        },
        auditDialogCancel () {
            this.auditDialogShow = false;
        },
        // 获取所有未发货订单
        getAllDeliveryOrder (data) {
            orderManageModel.deliveryOrder(data, res => {
                this.deliveryTableData = [];
                this.pagenationTotal = res.data.data.totalNum;
                let dataList = res.data.data.items;
                if (!!dataList && dataList.length > 0) {
                    dataList.forEach(item => {
                        item.sendStatus = item.sendStatus == '0' ? '待发货' : '已发货';
                        item.payType = item.payType == '1' ? '微信支付' : '货到付款';
                        item.operate = [
                            {name: '审核', disabled: false},
                            {name: '发货', disabled: item.auditStatus == '1' ? false : true},
                            {name: '取消订单', disabled: false},
                        ];
                        item.orderStatus = orderStatusDicObj[item.orderStatus];
                        item.auditStatus = auditStatusDicObj[item.auditStatus];
                        item.payStatus = payStatusMap[item.payStatus];
                        item.payTime = !!item.payTime ? formatDate.getDate(item.payTime, 'YYYY-MM-DD HH:mm:ss') : '';
                        item.createTime =!!item.createTime ? formatDate.getDate(item.createTime, 'YYYY-MM-DD HH:mm:ss') : '';
                        this.deliveryTableData.push(item);
                    });
                }
            }, err => {
                this.$message(err.data.errMsg);
            });
        },
        setSearchWord (value) {
            this.searchWord = value;
        },
        setAuditStatus (value) {
            this.selectText = value.name;
            this.auditStatus = value.id;
        },
        search () {
            let data = {
                currentPage: this.currentPage,
                pageSize: this.tableColumnSize,
                keyName: this.searchWord,
                auditStatus: this.auditStatus
            };
            this.getAllDeliveryOrder(data);
        },
        resetCallback () {
            this.searchWord = '';
            this.auditStatus = '';
            this.selectText = '';
            this.getAllDeliveryOrder({currentPage: this.currentPage, pageSize: this.tableColumnSize});
        }
    },
    components: {
        eleTable,
        deliveryDialog,
        confirmDialog,
        pagination,
        orderAuditingDialog,
        inputModel,
        selectModel
    },
    created () {
        this.tableHeaderData = deliveryOrderTableHeaderData;
        this.auditStatusList = auditStatusList;
        eventBus.$emit('setBreadcrumbs', '订单管理', '发货列表');
        this.getAllDeliveryOrder({currentPage: this.currentPage, pageSize: this.tableColumnSize});
    }
}
</script>
