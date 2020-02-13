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
                    :headerTitle="'新增角色'"
                    :cancel="cancel">
                </dialog-header>
                <div class="dialogBody">
                    <inputModel
                        :inputTitle="'角色名称 :'"
                        :inputModelWidth="'100%'"
                        :inputModelDisabled="false"
                        :inputValue="inputValue"
                        :inputPlacholder="'请输入角色名称'"
                        v-on:inputEvent="inputEvent">
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
            this.$emit('addRoleDialogCancel');
        },
        confirm () {
            this.$emit('addRoleDialogConfirm', this.inputValue);
        },
        inputEvent (value) {
            this.inputValue = value;
        }
    },
    components: {
        dialogHeader,
        dialogFooter,
        inputModel
    }
}
</script>
