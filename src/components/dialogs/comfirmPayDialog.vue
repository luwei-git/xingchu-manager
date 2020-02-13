<template>
    <div class="confirmPayPage">
        <el-dialog
        :visible.sync="dialogVisible"
        :append-to-body="true"
        :show-close="false"
        :close-on-click-modal="false"
        :top="'35vh'"
        width="17.7%">
            <dialog-header
                :cancel="cancel">
            </dialog-header>
            <div class="dialogBody">
                <p class="eachLine">订单号 :</p>
                <p class="eachLine orderNumber">{{orderCode}}</p>
                <p class="eachLine">收货人: </p>
                <p class="eachLine consigneeName">{{consigneeName}}</p>
                <p class="eachLine">是否确认客户已付款</p>
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
        height: 160px;
        margin-top: 10px;
        margin-bottom: 30px;
        .eachLine{
            margin-bottom: 10px;
        }
        .orderNumber, .consigneeName{
            font-weight: 700;
        }
    }
    
</style>
<script>
import dialogHeader from './dialogHeader'
import dialogFooter from './dialogFooter'
export default {
    data () {
        return{
            dialogVisible: true
        }
    },
    methods: {
        cancel () {
            this.dialogVisible = false;
            this.$emit('comfirmPayDialogCancel');
        },
        confirm () {
            this.dialogVisible = false;
            this.$emit('comfirmPayDialogConfirm');
        }
    },
    components: {
        dialogHeader,
        dialogFooter
    },
    props: ['orderCode', 'consigneeName', 'bodyHeight', 'iconShow']
}
</script>
