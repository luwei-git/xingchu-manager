<template>
    <div class="signListPage">
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
                    <div class="search fl tac cursorPointer" @click="searchOrderList">查询</div>
                    <div class="reset fl tac cursorPointer" @click="resetOrderList">重置</div>
                </div>
                <eleTable :tableData="signListData" :tableHeaderData="deliveryOrderTableHeaderData" :callbackObj="callbackObj"></eleTable>
                <pagination
                    :total="pagenationTotal" 
                    :pageSize="tableColumnSize"
                    :currentChangeCallback="currentChangeCallback"
                    v-on:paginationSizeChange="paginationSizeChange"
                    ref="pagination">
                </pagination>
            </div>
        </div>
        <comfirm-pay-dialog 
            v-if="comfirmPayDialogShow"
            :orderCode="orderCode"
            :consigneeName="consigneeName"
            v-on:comfirmPayDialogCancel="comfirmPayDialogCancel"
            v-on:comfirmPayDialogConfirm="comfirmPayDialogConfirm">
        </comfirm-pay-dialog>
        <reject-dialog
            v-if="rejectDialogShow"
            :orderCode="orderCode"
            :consigneeName="consigneeName"
            v-on:rejectDialogCancel="rejectDialogCancel"
            v-on:rejectDialogConfirm="rejectDialogConfirm">
        </reject-dialog>
    </div>
</template>
<style lang="less" scoped>
    
</style>
<script>
import inputModel from '../../common/formComponents/inputModel'
import eleTable from '../../common/eleTable'
import pagination from '../../common/pagination'
import eventBus from '../../../utils/eventBus'
import comfirmPayDialog from '../../dialogs/comfirmPayDialog'
import rejectDialog from '../../dialogs/rejectDialog'
import {deliveryOrderTableHeaderData} from '../../../config/orderManage'
import {orderManageModel} from '../../../api/orderManage'
import {orderStatusDicObj, auditStatusDicObj} from '../../../config/commonDic'
import {formatDate} from '../../../utils/formatDate'
export default {
    data () {
        return{
            orderCollectionData: [],
            deliveryOrderTableHeaderData: [],
            signListData: [],
            pagenationTotal: 0,
            tableColumnSize: 10,
            currentPage: 1,
            callbackObj: {operate: [this.showComfirmPayDialog, this.showRejectDialog]},
            comfirmPayDialogShow: false,
            currentRow: {},
            currentIndex: '',
            orderCode: '',
            consigneeName: '',
            rejectDialogShow: false,
            searchWord: ''
        }
    },
    methods: {
        setSearchWord (value) {
            this.searchWord = value;
        },
        searchOrderList () {
            this.getSignOrderList({pageSize: this.tableColumnSize, currentPage: this.currentPage, keyName: this.searchWord});
        },
        resetOrderList () {
            this.searchWord = '';
            this.getSignOrderList({pageSize: this.tableColumnSize, currentPage: this.currentPage});
        },
        currentChangeCallback (currentPage) {
            this.currentPage = currentPage;
            this.getSignOrderList({pageSize: this.tableColumnSize, currentPage: this.currentPage});
        },
        paginationSizeChange () {

        },
        getSignOrderList (data) {
            orderManageModel.orderSignList(data, res => {
                this.signListData = [];
                this.pagenationTotal = res.data.data.totalNum;
                if (!!res.data.data.items && res.data.data.items.length > 0) {
                    res.data.data.items.forEach(item => {
                        item.sendStatus = item.sendStatus == '0' ? '待发货' : '已发货';
                        item.payType = item.payType == '1' ? '微信支付' : '货到付款';
                        item.operate = [{name: '确认收款'}, {name: '拒收'}];
                        item.orderStatus = orderStatusDicObj[item.orderStatus];
                        item.auditStatus = auditStatusDicObj[item.auditStatus];
                        item.payStatus = item.payStatus == 0 ? '未支付' : '已支付' ;
                        item.payTime = !!item.payTime ? formatDate.getDate(item.payTime, 'YYYY-MM-DD HH:mm:ss') : '';
                        item.createTime =!!item.createTime ? formatDate.getDate(item.createTime, 'YYYY-MM-DD HH:mm:ss') : '';
                        this.signListData.push(item);
                    });
                }
            }, err => {
                this.$message(err.data.errMsg);
            });
        },
        showComfirmPayDialog (row, index) {
            this.currentRow = row;
            this.currentIndex = index;
            this.orderCode = row.orderCode;
            this.consigneeName = row.consigneeName;
            this.comfirmPayDialogShow = true;
        },
        comfirmPayDialogCancel () {
            this.comfirmPayDialogShow = false;
        },
        comfirmPayDialogConfirm () {
            orderManageModel.orderSign({orderId: this.currentRow.orderId, asignStatus: '1'}, res => {
                this.signListData.splice(this.currentIndex, 1);
                this.pagenationTotal = this.pagenationTotal -1;
                this.comfirmPayDialogShow = false;
            }, err => {
                this.$message(err.data.errMsg);
            })
        },
        showRejectDialog (row, index) {
            this.currentRow = row;
            this.currentIndex = index;
            this.orderCode = row.orderCode;
            this.consigneeName = row.consigneeName;
            this.rejectDialogShow = true;
        },
        rejectDialogCancel () {
            this.rejectDialogShow = false;
        },
        rejectDialogConfirm () {
            orderManageModel.orderSign({orderId: this.currentRow.orderId, asignStatus: '0'}, res => {
                this.signListData.splice(this.currentIndex, 1);
                this.pagenationTotal = this.pagenationTotal -1;
                this.rejectDialogShow = false;
            }, err => {
                this.$message(err.data.errMsg);
            })
        }
    },
    created () {
        this.deliveryOrderTableHeaderData = deliveryOrderTableHeaderData;
        this.getSignOrderList({pageSize: this.tableColumnSize, currentPage: this.currentPage});
    },
    components: {
        inputModel,
        eleTable,
        pagination,
        comfirmPayDialog,
        rejectDialog
    }
}
</script>
