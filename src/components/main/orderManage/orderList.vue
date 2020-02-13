<template>
    <div class="orderListPage">
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
                    <datePickerModel
                        :datePickerTitle="'订单时间:'"
                        :datePickerWidth="'120px'"
                        :datePickerFloat="'left'"
                        :datePickerMargin="'0 20px 0'"
                        v-on:chooseDate="setStartTime"
                        ref="startPicker">
                    </datePickerModel>
                    <div class="fl wordModel"><p class="top"></p><p class="word">至</p></div>
                    <datePickerModel
                        :datePickerTitle="''"
                        :datePickerWidth="'120px'"
                        :datePickerFloat="'left'"
                        :datePickerMargin="'0 20px 0'"
                        v-on:chooseDate="setEndTime"
                        ref="endPicker">
                    </datePickerModel>
                    <selectModel
                        :selectTitle="'订单状态 :'"
                        :selectValue="selectText"
                        :selectModelWidth="'200px'"
                        :selectModelDisabled="false"
                        :selectFloat="'left'"
                        :selectList="orderStatusList"
                        v-on:selectChoose="setOrderStatus">
                    </selectModel>
                    <div class="search fl tac cursorPointer" @click="searchOrderList">查询</div>
                    <div class="reset fl tac cursorPointer" @click="resetCallback">重置</div>
                </div>
                <eleTable :tableData="orderListData" :tableHeaderData="orderListTableHeaderData" :callbackObj="callbackObj"></eleTable>
                <pagination
                    :total="pagenationTotal" 
                    :pageSize="tableColumnSize"
                    :currentChangeCallback="currentChangeCallback"
                    v-on:paginationSizeChange="paginationSizeChange"
                    ref="pagination">
                </pagination>
            </div>
        </div>
        <confirmDialog
            v-if="confirmDialogVisible"
            :confirmTitle="'确认退款'"
            :confirmContent="'请确认是否要退款给用户？'"
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
import datePickerModel from '../../common/formComponents/datePickerModel'
import eleTable from '../../common/eleTable'
import pagination from '../../common/pagination'
import {orderListTableHeaderData} from '../../../config/orderManage'
import {orderManageModel} from '../../../api/orderManage'
import {formatDate} from '../../../utils/formatDate'
import {orderStatusDicObj, orderStatusList} from '../../../config/commonDic'
import eventBus from '../../../utils/eventBus'
import confirmDialog from '../../dialogs/confirmDialog'

const payStatusMap = {0:"未支付",1:"已支付",2:"支付失败",3:"已退款",4:"退款失败"};
export default {
    name:'orderList',
    data () {
        return{
            orderListData: [],
            orderListTableHeaderData: [],
            pagenationTotal: 0,
            tableColumnSize: 10,
            searchWord: '',
            currentPage: 1,
            startTime: '',
            endTime: '',
            orderStatus: '',
            orderStatusList: [],
            selectText: '',
            confirmDialogVisible: false,
            callbackObj: {operate: [this.showConfirmDialog]},
            currentRow: {}
        }
    },
    methods: {
        setSearchWord (value) {
            this.searchWord = value;
        },
        getAllOrder (data) {
            orderManageModel.getAllOrder(data, res => {
                this.orderListData = [];
                this.pagenationTotal = res.data.data.totalNum;
                let orderLsit = res.data.data.items;
                if (!!orderLsit && orderLsit.length > 0) {
                    orderLsit.forEach(item => {
                        if (item.receiveType == 1 && item.payType == 1 && item.payStatus == 1) {
                            item.operate = [
                                {name: '退款', disabled: item.payStatus == 3 ? true : false}
                            ];
                        }
                        item.orderStatus = orderStatusDicObj[item.orderStatus];
                        item.payType = item.payType == '1' ? '微信支付' : '货到付款';
                        item.payStatus = payStatusMap[item.payStatus];
                        item.sendTime = !!item.sendTime ? formatDate.getDate(item.sendTime, 'YYYY-MM-DD HH:mm:ss') : '';
                        item.payAmount = item.payAmount/100;
                        this.orderListData.push(item);
                    });
                }
            }, err => {
                this.$message(err.data.errMsg);
            });
        },
        setStartTime (value) {
            if (!!value) {
                this.startTime = formatDate.getFormatDate(value, 'YYYY-MM-DD') + ' 00:00:00'; 
            } else {
                this.startTime = '';
            }
        },
        setEndTime (value) {
            if (!!value) {
                this.endTime = formatDate.getFormatDate(value, 'YYYY-MM-DD') + ' 23:59:59'; 
            } else {
                this.endTime = '';
            }
        },
        setOrderStatus (value) {
            this.selectText = value.name;
            this.orderStatus = value.id;
        },
        // 根据条件查询订单列表
        searchOrderList () {
            let data = {
                currentPage: this.currentPage,
                pageSize: this.tableColumnSize,
                keyName: this.searchWord,
                orderStatus: this.orderStatus,
                createStartTime: this.startTime,
                createEndTime: this.endTime
            };
            this.getAllOrder(data);
        },
        currentChangeCallback (currentPage) {
            this.currentPage = currentPage;
            this.getAllOrder({currentPage: this.currentPage, pageSize: this.tableColumnSize});
        },
        paginationSizeChange (size) {
            this.tableColumnSize = size;
            this.getAllOrder({currentPage: this.currentPage, pageSize: this.tableColumnSize});
        },
        resetCallback () {
            this.searchWord = '';
            this.$refs.startPicker.timeValue = '';
            this.$refs.endPicker.timeValue = '';
            this.startTime = '';
            this.endTime = '';
            this.selectText = '';
            this.orderStatus = '';
            this.searchOrderList();
        },
        confirmDialogCancel () {
            this.confirmDialogVisible = false;
        },
        confirmDialogConfirm () {
            this.confirmDialogVisible = false;
            orderManageModel.orderCancel({orderId: this.currentRow.orderId}, res => {
                this.getAllOrder({currentPage: this.currentPage, pageSize: this.tableColumnSize});
            });
        },
        showConfirmDialog (row, index) {
            this.currentRow = row;
            this.confirmDialogVisible = true;
        }
    },
    created () {
        this.orderListTableHeaderData = orderListTableHeaderData;
        this.orderStatusList = orderStatusList;
        eventBus.$emit('setBreadcrumbs', '订单管理', '订单列表');
        this.getAllOrder({currentPage: this.currentPage, pageSize: this.tableColumnSize});
    },
    components: {
        eleTable,
        pagination,
        selectModel,
        inputModel,
        datePickerModel,
        confirmDialog
    }
}
</script>
