<template>
    <div class="addRoleDialogPage">
        <el-dialog
            :visible.sync="dialogVisible"
            :append-to-body="true"
            :show-close="false"
            :close-on-click-modal="false"
            :top="'15vh'"
            width="17.7%">
                <dialog-header
                    :headerTitle="confirmTitle"
                    :cancel="cancel">
                </dialog-header>
                <div class="dialogBody">
                    <p>{{confirmContent}}</p>
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
        height: 100px;
    }
</style>
<script>
import dialogHeader from './dialogHeader'
import dialogFooter from './dialogFooter'
import inputModel from '../common/formComponents/inputModel'
export default {
    data () {
        return{
            dialogVisible: true,
            inputValue: ''
        }
    },
    methods: {
        cancel () {
            this.dialogVisible = false;
            this.$emit('confirmDialogCancel');
        },
        confirm () {
            this.dialogVisible = false;
            this.$emit('confirmDialogConfirm');
        }
    },
    props: ['confirmTitle','confirmContent'],
    components: {
        dialogHeader,
        dialogFooter
    }
}
</script>
