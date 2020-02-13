<template>
    <div class="deliveryDialogPage">
        <el-dialog
        :visible.sync="dialogVisible"
        :append-to-body="true"
        :show-close="false"
        :close-on-click-modal="false"
        width="34.4%">
            <dialog-header
                :headerTitle="'发货'"
                :cancel="cancel">
            </dialog-header>
            <div class="dialogBody clearfix">
                <inputModel
                    :inputTitle="'订单号 :'"
                    :inputModelWidth="'47.5%'"
                    :inputModelDisabled="true"
                    :inputValue="deliveryDialogData.orderCode"
                    :inputFloat="'left'">
                </inputModel>
                <inputModel
                    :inputTitle="'商品名称 :'"
                    :inputModelWidth="'47.5%'"
                    :inputModelDisabled="true"
                    :inputValue="deliveryDialogData.goodsName"
                    :inputFloat="'right'">
                </inputModel>
                <inputModel
                    :inputTitle="'收货人 :'"
                    :inputModelWidth="'47.5%'"
                    :inputModelDisabled="true"
                    :inputValue="deliveryDialogData.consigneeName"
                    :inputFloat="'left'">
                </inputModel>
                <inputModel
                    :inputTitle="'订单状态 :'"
                    :inputModelWidth="'47.5%'"
                    :inputModelDisabled="true"
                    :inputValue="deliveryDialogData.orderStatus"
                    :inputFloat="'right'">
                </inputModel>
                <inputModel
                    :inputTitle="'联系电话 :'"
                    :inputModelWidth="'47.5%'"
                    :inputModelDisabled="true"
                    :inputValue="deliveryDialogData.phone"
                    :inputFloat="'left'">
                </inputModel>
                <textareaModel
                    :textareaTitle="'地址 :'"
                    :textareaModelWidth="'47.5%'"
                    :textareaModelDisabled="true"
                    :textareaValue="deliveryDialogData.detailAddress"
                    :textareaFloat="'right'">
                </textareaModel>
                <selectModel
                    :selectTitle="'快递公司 :'"
                    :selectValue="selectText"
                    :selectModelWidth="'47.5%'"
                    :selectModelDisabled="false"
                    :selectFloat="'left'"
                    :selectList="expressList"
                    v-on:selectChoose="selectChoose">
                </selectModel>
                <inputModel
                    :inputTitle="'快递单号 :'"
                    :inputModelWidth="'47.5%'"
                    :inputModelDisabled="false"
                    :inputModelMargin="'0 100px 0 0'"
                    :inputValue="''"
                    v-on:inputEvent="setTrackingNumber">
                </inputModel>
            </div>
            <dialog-footer
                :cancel="cancel"
                :confirm="confirm">
            </dialog-footer>
        </el-dialog>
    </div>
</template>

<style lang="less" scoped>
    .dialogBody{ 
        height: 380px;
    }
</style>

<script>
import dialogHeader from './dialogHeader'
import dialogFooter from './dialogFooter'
import inputModel from '../common/formComponents/inputModel'
import selectModel from '../common/formComponents/selectModel'
import textareaModel from '../common/formComponents/textareaModel'
import {validateEmptyString} from '../../utils/validate'
import {orderManageModel} from '../../api/orderManage'
export default {
    name: 'deliveryDialog',
    data () {
        return {
            dialogVisible: true,
            expressList: [], // 快递公司列表
            expressCode: '', //快递公司
            trackingNumber: '',
            selectText: ''
        }
    },
    methods: {
        // 获取可用快递列表
        getExpressList () {
            orderManageModel.getExpressList({}, res => {
                if (res.data.data && res.data.data.length > 0) {
                    this.expressList = res.data.data;
                    this.expressList.forEach(item => {
                        item.name = item.expressName;
                    });
                }
            })
        },
        confirm () {
            if (validateEmptyString(this.expressCode)) {
                this.$message('请选择快递公司');
            } else if (validateEmptyString(this.trackingNumber)) {
                this.$message('请选填写快递单号');
            } else if (!/^[a-zA-Z0-9]+$/.test(this.trackingNumber)) {
                this.$message('快递单号由字母和数字组成');
            } else {
                let data = {orderId: this.deliveryDialogData.orderId, expressCode: this.expressCode, trackingNumber: this.trackingNumber};
                this.dialogVisible = false;
                this.$emit('deliveryDialogConfirm', data);
            }
        },
        cancel () {
            this.dialogVisible = false;
            this.$emit('deliveryDialogCancel');
        },
        // 快递公司选择回调
        selectChoose (value) {
            this.selectText = value.name;
            this.expressCode = value.expressCode;
        },
        // 输入快递单号回调
        setTrackingNumber (value) {
            this.trackingNumber = value;
        }
    },
    created () {
        this.getExpressList();
    },
    components: {
        inputModel,
        textareaModel,
        selectModel,
        dialogHeader,
        dialogFooter
    },
    props: ['deliveryDialogData']
}
</script>
