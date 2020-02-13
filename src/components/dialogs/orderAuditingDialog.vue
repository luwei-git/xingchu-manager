<template>
    <div class="orderAuditingPage">
        <el-dialog
            :visible.sync="dialogVisible"
            :append-to-body="true"
            :show-close="false"
            :close-on-click-modal="false"
            :top="'10vh'"
            width="34.4%">
                <dialog-header
                    :headerTitle="'审核订单'"
                    :cancel="cancel">
                </dialog-header>
                <div class="dialogBody">
                    <inputModel
                        :inputTitle="'订单号 :'"
                        :inputModelWidth="'47.5%'"
                        :inputModelDisabled="true"
                        :inputValue="orderAuditingDialogData.orderCode || '无'"
                        :inputFloat="'left'">
                    </inputModel>
                    <!-- 商品封面特殊处理 -->
                    <div class="goodsImg fr">
                        <div class="title">商品封面 :</div>
                        <img class="fl" src="../../assets/images/setting/xts_icon.png" alt="">
                    </div>
                    <inputModel
                        :inputTitle="'商品名称 :'"
                        :inputModelWidth="'47.5%'"
                        :inputModelDisabled="true"
                        :inputValue="orderAuditingDialogData.goodsName  || '无'"
                        :inputFloat="'left'">
                    </inputModel>
                    <inputModel
                        :inputTitle="'商品积分 :'"
                        :inputModelWidth="'47.5%'"
                        :inputModelDisabled="true"
                        :inputValue="'无'"
                        :inputFloat="'left'">
                    </inputModel>
                    <inputModel
                        :inputTitle="'邮政编码 :'"
                        :inputModelWidth="'47.5%'"
                        :inputModelDisabled="true"
                        :inputValue="orderAuditingDialogData.postalcode  || '无'"
                        :inputFloat="'right'">
                    </inputModel>
                    <inputModel
                        :inputTitle="'抵用券 :'"
                        :inputModelWidth="'47.5%'"
                        :inputModelDisabled="true"
                        :inputValue="orderAuditingDialogData.couponName  || '无'"
                        :inputFloat="'left'">
                    </inputModel>
                    <inputModel
                        :inputTitle="'邮费 :'"
                        :inputModelWidth="'47.5%'"
                        :inputModelDisabled="true"
                        :inputValue="orderAuditingDialogData.postage  || '无'"
                        :inputFloat="'right'">
                    </inputModel>
                    <inputModel
                        :inputTitle="'使用积分 :'"
                        :inputModelWidth="'47.5%'"
                        :inputModelDisabled="true"
                        :inputValue="orderAuditingDialogData.payCoupon  || '无'"
                        :inputFloat="'left'">
                    </inputModel>
                    <inputModel
                        :inputTitle="'订单状态 :'"
                        :inputModelWidth="'47.5%'"
                        :inputModelDisabled="true"
                        :inputValue="orderAuditingDialogData.orderStatus  || '无'"
                        :inputFloat="'right'">
                    </inputModel>
                    <inputModel
                        :inputTitle="'收货人 :'"
                        :inputModelWidth="'47.5%'"
                        :inputModelDisabled="true"
                        :inputValue="orderAuditingDialogData.consigneeName  || '无'"
                        :inputFloat="'left'">
                    </inputModel>
                    <inputModel
                        :inputTitle="'创建时间 :'"
                        :inputModelWidth="'47.5%'"
                        :inputModelDisabled="true"
                        :inputValue="orderAuditingDialogData.createTime  || '无'"
                        :inputFloat="'right'">
                    </inputModel>
                    <inputModel
                        :inputTitle="'联系电话 :'"
                        :inputModelWidth="'47.5%'"
                        :inputModelDisabled="true"
                        :inputValue="orderAuditingDialogData.phone  || '无'"
                        :inputFloat="'left'">
                    </inputModel>
                    <inputModel
                        :inputTitle="'支付方式 :'"
                        :inputModelWidth="'47.5%'"
                        :inputModelDisabled="true"
                        :inputValue="orderAuditingDialogData.payType  || '无'"
                        :inputFloat="'right'">
                    </inputModel>
                    <textareaModel
                        :textareaTitle="'地址 :'"
                        :textareaModelWidth="'47.5%'"
                        :textareaModelDisabled="true"
                        :textareaHeight="'100px'"
                        :textareaMarginBottom="'10px'"
                        :textareaValue="orderAuditingDialogData.detailAddress  || '无'"
                        :textareaFloat="'left'">
                    </textareaModel>
                    <inputModel
                        :inputTitle="'支付状态 :'"
                        :inputModelWidth="'47.5%'"
                        :inputModelDisabled="true"
                        :inputValue="orderAuditingDialogData.payStatus  || '无'"
                        :inputFloat="'right'">
                    </inputModel>
                    <inputModel
                        :inputTitle="'支付时间 :'"
                        :inputModelWidth="'47.5%'"
                        :inputModelDisabled="true"
                        :inputValue="orderAuditingDialogData.payTime  || '无'"
                        :inputFloat="'right'">
                    </inputModel>
                    <selectModel
                        :selectTitle="'审核状态 :'"
                        :selectModelWidth="'47.5%'"
                        :selectFloat="'left'"
                        :selectList="selectList"
                        :selectValue="auditText"
                        v-on:selectChoose="auditChoose">
                    </selectModel>
                    <textareaModel
                        :textareaTitle="'tips :'"
                        :textareaModelWidth="'47.5%'"
                        :textareaHeight="'100px'"
                        :textareaModelDisabled="true"
                        :textareaValue="'如用户未支付，只做邮费变更功能，审核状态不可变更；如用户已支付，做审核功能'"
                        :textareaFloat="'right'">
                    </textareaModel>
                    <textareaModel
                        :textareaTitle="'审核意见 :'"
                        :textareaModelWidth="'47.5%'"
                        :textareaModelDisabled="false"
                        :textareaValue="auditOpinion"
                        :textareaFloat="'left'"
                        v-on:textareaInputEvent="textareaInputEvent">
                    </textareaModel>
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
        height: 820px;
    }
    .goodsImg{
        width: 47.5%;
        margin-bottom: 14px;
        .title{
            margin-bottom: 5px;
        }
        img{
            width: 100px;
            height: 100px;
        }
    }
</style>
<script>
import dialogHeader from './dialogHeader'
import dialogFooter from './dialogFooter'
import inputModel from '../common/formComponents/inputModel'
import textareaModel from '../common/formComponents/textareaModel'
import selectModel from '../common/formComponents/selectModel'
export default {
    data () {
        return{
            dialogVisible: true,
            selectList: [{name: '待审核', id: '0'}, {name: '审核通过', id: '1'}, {name: '审核不通过', id: '2'},], //订单审核状态
            auditStatus: '',
            auditOpinion: '',
            auditText: ''
        }
    },
    methods: {
        cancel () {
            this.dialogVisible = false;
            this.$emit('orderAuditDialogCancel');
        },
        confirm () {
            this.dialogVisible = false;
            this.$emit('orderAuditDialogConfirm', {orderId: this.orderAuditingDialogData.orderId, auditStatus: this.auditStatus, auditOpinion: this.auditOpinion});
        },
        // 点击审核列表回调
        auditChoose (value) {
            this.auditText = value.name;
            this.auditStatus = value.id;
        },
        // 审核意见输入回调
        textareaInputEvent (value) {
            this.auditOpinion = value;
        }
    },
    created () {
        this.auditOpinion = this.orderAuditingDialogData.auditOpinion || '';
        this.auditStatus = this.orderAuditingDialogData.auditStatus == '待审核' ? '0' : (this.orderAuditingDialogData.auditStatus == '审核通过' ? '1' : '2');
        this.auditText = this.orderAuditingDialogData.auditStatus;
    },
    components: {
        dialogHeader,
        dialogFooter,
        inputModel,
        textareaModel,
        selectModel
    },
    props: ['orderAuditingDialogData']
}
</script>
