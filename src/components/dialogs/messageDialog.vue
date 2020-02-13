<template>
    <div class="messageModelPage">
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
                <i v-if="iconShow || false" class="messageicon fl"></i>
                <span>{{messageText}}</span>
            </div>
            <dialog-footer
                :cancel="cancel"
                :confirm="confirm">
            </dialog-footer>
        </el-dialog>
    </div>
</template>
<style>
    .messageicon{
        display: block;
        width: 52px;
        height: 52px;
        margin: -16px 20px 0 22px;
        background: url('../../assets/images/setting/xts_icon.png') no-repeat;
    }
    .dialogBody{
        height: 50px;
        margin-top: 10px;
        margin-bottom: 30px;
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
            this.$emit('messageDialogCancel');
        },
        confirm () {
            this.dialogVisible = false;
            this.$emit('messageDialogConfirm');
        }
    },
    components: {
        dialogHeader,
        dialogFooter
    },
    props: ['messageText', 'bodyHeight', 'iconShow']
}
</script>
